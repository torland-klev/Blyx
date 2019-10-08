const http = require('http');
const app = require('./src/rest/app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, '0.0.0.0',() => {
  console.log('Blux API running on port ' + port + '.');
});
