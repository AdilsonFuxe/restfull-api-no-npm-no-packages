/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');

// The server should respond to all request with a string
const server = http.createServer(function (req, res) {
  //Get the path
  const path = req.url.replace(/^\/+|\/+$/g, '');

  //Get the HTTP Method
  const method = req.method.toLowerCase();

  //Send the Response
  res.end('Hello World\n');

  // Log the request path
  console.log('Request received on path: ' + path + ' with method: ' + method);
});

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log('The server is listeing on port 3000 now');
});
