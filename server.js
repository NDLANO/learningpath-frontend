/* eslint no-console:0 */
'use strict';

const connect = require('connect');
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

function sendJsonData(statusCode, data) {
  const json = JSON.stringify(data);

  return function (req, res) {
    console.log('%s %s', req.method, req.originalUrl);
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(json);
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



app.use('/auth/me', withAppKeyCheck(sendJsonData(200, currenUser)));

app.use('/auth/login/twitter', sendRedirect('/login/failure'));
app.use('/auth/login', sendRedirect('/login/success/' + AUTH_TOKEN));
app.use('/auth/logout', withAppKeyCheck(sendJsonData(200, {})));

app.use('/paths/private', withAppKeyCheck(sendJsonData(200, data.private)));
app.use('/paths', sendJsonData(200, data.public));

app.use(function (req, res) {
  res.writeHead(404);
  res.end('404');
});


app.listen(3000);
