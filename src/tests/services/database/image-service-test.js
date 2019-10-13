const { storeImage } = require('../../../rest/services/database/image-services');
const { logTools } = require('../../../config/globals');

//Import fs (https://nodejs.org/api/fs.html)
const fs = require('fs');

let seperator = logTools.seperator;

class imageServiceTest {
  constructor(){};

  /* Sequence:
   * 1. storeImageString
   * 2. storeImageObject
   */
  run(){
    return new Promise(function(resolve, reject) {
      storeImageString()
      .then((retString) => {
        console.log(retString, '\n(String) Finished!');
        storeImageObject()
        .then((retObject) => {
          console.log(retObject, '\n(Object) Finished!')
          return resolve();
        })
        .catch((err) => {
          console.log('(Object) Test failed.', err);
          return reject(err);
        });
      })
      .catch((err) => {
        console.log('(String) Test failed.', err);
        return reject(err);
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
        return reject('(String) Test failed: ', error);
      }
      else{
        return resolve('(String) Image was successfully stored with ID: ' + result.rows[0].image_id);
      }
    });
  });
}

/* Store image by parsing it through fs and sending it as an object.
 * Returns the image_id given by the database. */

function storeImageObject(){
  return new Promise(function(resolve, reject) {
    console.log('(Object) Starting!');
    fs.readFile((__dirname + '/test-png.PNG'), (err, imgData) => {
      if (err){
        return reject('(Object) Test failed: ', err);
      } else {
        storeImage(1, imgData, (error, result) => {
          if (error) {
            return reject('(Object) Test failed: ', err);
          } else {
            return resolve('(Object) Image was successfully stored with ID: ' + result.rows[0].image_id);
          }
        });
      }
    });
  });

}

function getImageTest(){

}

module.exports = imageServiceTest;
