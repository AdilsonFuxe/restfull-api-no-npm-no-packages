/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');
const url = require('url');

// The server should respond to all request with a string
const server = http.createServer(function (req, res) {
  //Get the path
  const path = req.url.replace(/^\/+|\/+$/g, '');

  //Send the Response
  res.end('Hello World\n');

  // Log the request path
  console.log('Request received on path: ' + path);
});

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log('The server is listeing on port 3000 now');
});
