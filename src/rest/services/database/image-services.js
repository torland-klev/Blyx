// Import database
const { pool } = require('../../../config/globals');

// Import fs (https://nodejs.org/api/fs.html)
const fs = require('fs');

// Stores a image in the database, returns (error, image_id);
const storeImage = (userID, image, callback) => {

  var toInsert = null;

  // If the image is a string, it is a supplied path.
  if(typeof(image) === 'string'){
    fs.readFile(image, (err, imgData) => {
      if (err) {
        return callback(err, null);
      }
      toInsert = imgData;
    });
  }
  // If the images is an object, it is most likely the image.
  else if(typeof(image) === 'object'){
    toInsert = image;
  }

  // Inserting data into 'profile_images' in column 'image' of type 'bytea'
  // and column 'user_id' of type bigint.
  pool.query('INSERT INTO images(user_id, image) VALUES($1, $2) RETURNING image_id', [userID, toInsert], (error, result) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, result);
    }
  });

};

/* Get a images from a given image_id */
const getImage = (image_id, callback) => {
  pool.query('SELECT image FROM images WHERE (image_id = $1)', [image_id], (error, result) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, result);
    }
  });
}

/* Get all images from a given user_id */
const getUserImages = (user_id, callback) => {
  pool.query('SELECT image FROM images WHERE (user_id = $1)', [user_id], (error, result) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, result);
    }
  });
}

module.exports = {
  storeImage,
  getImage,
  getUserImages,
};
