const imageServiceTest  = require('./services/database/image-service-test');

console.log("(Master) Running tests");
new imageServiceTest()
.run()
.then((done) => {
  console.log("(Master) Testing completed successfully!.");
})
.catch(error => {
  console.log("(Master) Testing failed.", error);
})
