const { storeImage, getImage, getUserImages } = require('../../../rest/services/database/image-services');
const { logTools } = require('../../../config/globals');

//Import fs (https://nodejs.org/api/fs.html)
const fs = require('fs');

let seperator = logTools.seperator;

class imageServiceTest {
  constructor(){
    console.log(seperator, '\nStarting Image-Service Tests\n', seperator);
  };

  /* Sequence:
   * 1. storeImageString
   * 2. storeImageObject
   * 3. getImages
   *
   * TODO: Make the sequence concurrent, monitor perhaps?
   */
  run(){
    return new Promise((resolve, reject) => {
      var error = false;

      storeImageString()
      .catch(() => {error = true})
      .then(() => storeImageObject())
      .catch(() => {error = true})
      .then(() => getUserImagesTest())
      .then((images) => {/* Do something with images*/})
      .catch(() => {error = true})
      .then(() => getImageTest())
      .then((image) => {/* Do something with image*/})
      .catch(() => {error = true})
      .then(() => {
        if (error) {
          reject();
        }
        resolve();
      });
    });
  }
}

/* Store image with a supplied string-name of the image.
 * Image has to be stored in same folder as the storeImage
 * function, so this has little use. However, it was a feature
 * simple enough to implement.
 * Returns the image_id given by the database. */

function storeImageString(){
  return new Promise((resolve, reject) => {
    console.log('(String) Starting!');
    storeImage(1, __dirname + '/test-jpg.jpg', (error, result) => {
      if(error){
        console.log('(String) Test failed: ', error);
        reject();
      }
      else{
        console.log('(String) Image was successfully stored with ID: ' + result.rows[0].image_id, '\n(String) Finished!\n', seperator);
        resolve();
      }
    });
  })
}

/* Store image by parsing it through fs and sending it as an object.
 * Returns the image_id given by the database. */

function storeImageObject(){
  return new Promise(function(resolve, reject) {
    console.log('(Object) Starting!');
    fs.readFile((__dirname + '/test-png.PNG'), (err, imgData) => {
      if (err){
        console.log('(Object) Test failed: ', err);
        reject();
      } else {
        storeImage(1, imgData, (error, result) => {
          if (error) {
            console.log('(Object) Test failed: ', err);
            reject();
          } else {
            console.log('(Object) Image was successfully stored with ID: ', result.rows[0].image_id, '\n(Object) Finished!\n',seperator);
            resolve();
          }
        });
      }
    });
  });

}

/* Get all images from a given user_id */
function getUserImagesTest(){
  return new Promise((resolve, reject) => {
    console.log('(GET-IMAGES) Starting!');
    getUserImages(1, (err, res) => {
      if (err) {
        console.log('(GET-IMAGES) Test failed: ', err);
        reject();
      } else {
        console.log('(GET-IMAGES) Number of images retreived: ', res.rows.length, '\n(GET-IMAGES) Finished!\n',seperator);
        resolve(res);
      }
    })
  })
}

/* Get a images from a given image_id */
function getImageTest(){
  return new Promise((resolve, reject) => {
    console.log('(GET-IMAGES) Starting!');
    getImage(95, (err, res) => {
      if (err) {
        console.log('(GET-IMAGE) Test failed: ', err);
        reject();
      } else {
        console.log('(GET-IMAGE) Images retreived: ', res.rows[0].image, '\n(GET-IMAGE) Finished!\n',seperator);
        resolve(res);
      }
    })
  })
}

module.exports = imageServiceTest;
