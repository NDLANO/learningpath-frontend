'use strict';

const connect = require('connect');
const app = connect();

const currenUser = JSON.stringify({
  id: '1',
  first_name: 'Kristofer',
  middle_name: null,
  last_name: 'Walters',
  email: 'kw@knowit.no'
});

function sendUser(req, res) {
  console.log(req.headers);
  res.writeHead(200, {
    'Content-Length': currenUser.length,
    'Content-Type': 'application/json'
  });
  res.end(currenUser);
}

app.use('/auth/me', sendUser);

function sendAuthCode(req, res) {
  res.writeHead(302, { 'Location': '/learningpath/login/success/abcdefghijklmn' });
  res.end('redirect');
}

app.use('/auth/login', sendAuthCode);

app.use(function (req, res) {
  res.writeHead(404);
  res.end('404');
});


app.listen(3000);
