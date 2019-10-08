const http = require('http');
const app = require('./app');

//Running on HTTP port 80
const port = process.env.PORT || 80;

const server = http.createServer(app);

server.listen(port, '0.0.0.0',() => {
  console.log('Blux API running on port ' + port + '.');
});
