//Import database
const { pool } = require('../../../config/globals');

//Import fs (https://nodejs.org/api/fs.html)
const fs = require('fs');

//Stores a image in the database, returns (error, image_id);
const storeImage = function(userID, image, callback) {
  //If the image is a string, it is a supplied path.
  if(typeof(image) === 'string'){
    fs.readFile(image, (err, imgData) =>  {
      // Inserting data into 'profile_images' in column 'image' of type 'bytea'
      // and column 'user_id' of type bigint.
      if (err) {
        return callback(err, null);
      }
      else {
        pool.query('INSERT INTO images(user_id, image) VALUES($1, $2) RETURNING image_id', [userID, imgData], (error, result) => {
          if (error) {
            return callback(error, null);
          } else {
            return callback(null, result);
          }
        });
      }
    })
  }
};
module.exports = {
  storeImage,
};
