/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');
const StringDecoder = require('string_decoder').StringDecoder;

const PORT = 3000;
const SERVER_URL = 'http://localhost:3000';

// The server should respond to all request with a string
const server = http.createServer(function (req, res) {
  const myURL = new URL(`${SERVER_URL}:${PORT}${req.url}`);

  // Get the path
  const path = myURL.pathname;

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

    // Choose the handler this request should goto

    const chooseHandler =
      typeof router[path] != 'undefined' ? router[path] : handlers.notFound;

    //  Construct the data object to send to the handler

    const data = {
      path: path,
      query: myURL.searchParams,
      method: method,
      headers: headers,
      payload: buffer,
    };

    // Route the request to the handler specified in the router

    chooseHandler(data, function (statusCode, payload) {
      // use the status code called back  by the handler, or default 200
      statusCode = typeof statusCode == 'number' ? statusCode : 200;
      // use the payload called back by the handler or default to an empty object
      payload = typeof payload == 'object' ? payload : {};

      // convert payload to a string

      const payloadtString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadtString);
      // Log the request payload
      console.log('Returning this response:', statusCode, payloadtString);
    });
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
server.listen(PORT, function () {
  console.log(`The server is listeing on port ${PORT} now`);
});

// Define the handles
const handlers = {};

// Sample Handler

handlers.sample = function (data, callback) {
  // Callback a http status code, and a payload object
  callback(406, { name: 'sample handler' });
};

// Not Found Handler

handlers.notFound = function (data, callback) {
  callback(404);
};

// Define a request router
const router = {
  sample: handlers.sample,
};
