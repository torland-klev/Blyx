const { storeImage } = require('../../../rest/services/database/image-services');
const { logTools } = require('../../../config/globals');

let seperator = logTools.seperator;

const imageServiceTest = {
  run: run,
}

function run(){
  console.log(seperator);
  console.log('IMAGE SERVICE TESTS');
  console.log(seperator, '\n');

  storeImageTest();

}

function storeImageTest(){
  console.log('storeImageTest:');
  console.log(__dirname);
  storeImage(1, __dirname + '/test-jpg.jpg', (error, result) => {
    if(error){
      console.log(error);
    }
    else{
      console.log('Image ID: ', result);
    }
  });
}

module.exports = {
  imageServiceTest,
};
