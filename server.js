/* eslint no-console:0 */
'use strict';

const connect = require('connect');
const qs = require('qs');
const app = connect();

const AUTH_TOKEN = '12345abcde';
const data = require('./server-data');
const currenUser = {
  id: '1',
  first_name: 'Kristofer',
  middle_name: null,
  last_name: 'Walters',
  email: 'kw@knowit.no'
};

function log (req) {
  console.log('%s %s', req.method, req.originalUrl);
}

function sendJsonData(statusCode, data) {
  const json = JSON.stringify(data);

  return function (req, res) {
    log(req);
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(json);
  };
}

function sendNoContent() {
  return function (req, res) {
    log(req);
    res.writeHead(204);
    res.end();
  };
}

function sendRedirect(location) {
  return function sendAuthCode(req, res) {
    res.writeHead(302, { 'Location': location });
    res.end('redirect');
  };
}


function withAppKeyCheck (cb) {
  const sendAccessDenied = sendJsonData(403, { message: 'Invalid authentication credentials' });

  return function checkAppKeyHeader (req, res) {
    if (req.headers['app-key'] === AUTH_TOKEN) {
      console.log('%s %s app-key %s granted', req.method, req.originalUrl, req.headers['app-key']);
      return cb(req, res);
    }

    console.log('%s %s app-key %s denied', req.method, req.originalUrl, req.headers['app-key']);
    sendAccessDenied(req, res);
  };
}


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, App-Key');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  next();
});

app.use(function(req, res, next) {
  req.query = qs.parse(req.url.split('?')[1]);
  next();
});

app.use('/auth/me', withAppKeyCheck(sendJsonData(200, currenUser)));

app.use('/auth/login/twitter', function (req, res) {
  var url = req.query.failureUrl || '/failure';
  sendRedirect(url)(req, res);
});
app.use('/auth/login', function (req, res) {
  var url = req.query.successUrl ? req.query.successUrl.replace('{appkey}', AUTH_TOKEN) : '/success';
  sendRedirect(url)(req, res);
});
app.use('/auth/logout', withAppKeyCheck(sendNoContent()));

app.use('/learningpaths/private', withAppKeyCheck(function (req, res) {
  var urlChunks = req.url.split('/').filter(function (chunk) { return chunk !== ''; });

  switch (urlChunks.length) {
  case 0:
    return sendJsonData(200, data.private)(req, res);
  case 1:
    return sendJsonData(200, data.private[0])(req, res);
  default:
    res.writeHead(404);
    res.end('404');
  }
}));

app.use('/learningpaths', function (req, res) {
  var urlChunks = req.url.split('/').filter(function (chunk) { return chunk !== ''; });

  switch (urlChunks.length) {
  case 0:
    return sendJsonData(200, data.public)(req, res);
  case 1:
    return sendJsonData(200, data.public[0])(req, res);
  default:
    res.writeHead(404);
    res.end('404');
  }
});

app.use(function (req, res) {
  res.writeHead(404);
  res.end('404');
});


app.listen(3000);
console.log('running');
