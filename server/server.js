#!/usr/bin/env node

/* eslint-disable */

var http = require('http');

require('babel-register');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = true;  // Disables server side rendering

var app = require('./app');

var server = http.createServer(app);

server.listen(3000);
server.on('listening', () => {
  console.log('Listening on 3000');
});
/* eslint-enable */
