/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');
const https = require('https');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');

const HTTP_PORT = config.httpPort;
const HTTPS_PORT = config.httpsPort;
const SERVER_HTTP_URL = 'http://localhost';
const SERVER_HTTPS_URL = 'https://localhost';

// Instantiate the http server
const httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res, SERVER_HTTP_URL, HTTP_PORT);
});

// Instantiate the https server
const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
};
const httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res, SERVER_HTTPS_URL, HTTPS_PORT);
});

// Start the http server
httpServer.listen(HTTP_PORT, function () {
  console.log(
    `The server is listeing on port ${HTTP_PORT} now in ${config.envName} mode`
  );
});

// Start the https server

httpsServer.listen(HTTPS_PORT, function () {
  console.log(
    `The server is listeing on port ${HTTPS_PORT} now in ${config.envName} mode`
  );
});

// All the server logic fot both the http and https server

const unifiedServer = function (req, res, server_url, server_port) {
  const myURL = new URL(`${server_url}:${server_port}${req.url}`);

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
};

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
