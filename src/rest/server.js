const http = require('http');
const routes = require('./routes');

//Running on HTTP port 80
const port = process.env.PORT || 3000;

const server = http.createServer(routes);

server.listen(port, '0.0.0.0',() => {
  console.log('Blux API running on port ' + port + '.');
});
