// Import database
const { pool } = require('../../../config/globals');

// Import fs (https://nodejs.org/api/fs.html)
const fs = require('fs');

/* Public
 * Stores an image */
const storeImage = (userID, object, callback) => {
  storeObject('images', userID, object, 'image_id', callback);
}

/* Stores a object in the database, returns (error, <id>).
 * Using a paramtereized query, where string concatination
 * occurs for hard-coded values. */
const storeObject = (table, userID, object, id, callback) => {

  // Object to be stored is allowed to be null.
  var toInsert = null;

  // If the object is a string, it is a supplied path.
  if(typeof(object) === 'string'){
    fs.readFile(object, (err, objData) => {
      if (err) {
        return callback(err, null);
      }
      toInsert = objData;
    });
  }
  else if(typeof(object) === 'object'){
    toInsert = object;
  }

  pool.query('INSERT INTO '+ table +'(user_id, image) VALUES($1, $2) RETURNING ' + id, [userID, toInsert], (error, result) => {
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
