/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');

const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all request with a string
const server = http.createServer(function (req, res) {
  // Get the path
  const path = req.url.replace(/^\/+|\/+$/g, '');

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Get Headers as an object
  const headers = req.headers;

  // Get Payload Request
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();
    // Send the Response
    res.end('Hello World\n');

    // Log the request payload
    console.log(' Request received with this payload:', buffer);
  });

  // // Log the Request  Path
  // console.log('Request Path: ', path);
  // // Log the Request Query
  // console.log('Request Query: ', {});
  // // Log the HTTP Request Method
  // console.log('HTTP Request Method: ', method);
  // // Log the Headers
  // console.log('Request Headers: ', headers);
});

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log('The server is listeing on port 3000 now');
});
