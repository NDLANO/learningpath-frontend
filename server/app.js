/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import compression from 'compression';
import defined from 'defined';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import requestProxy from 'express-request-proxy';

import config from '../src/config';
import webpackConfig from '../webpack.config.dev';
import { getHtmlLang } from '../src/locale/configureLocale';
import Html from './Html';
import { getToken, isTokenExpired } from './auth';
import Auth0SilentCallback from './Auth0SilentCallback';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
    },
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler, {}));
}

app.use(compression());
app.use(express.static('htdocs', {
  maxAge: 1000 * 60 * 60 * 24 * 365, // One year
}));

const findIEClass = (userAgentString) => {
  if (userAgentString.indexOf('MSIE') >= 0) {
    return 'ie lt-ie11';
  } else if (userAgentString.indexOf('Trident/7.0; rv:11.0') >= 0) {
    return 'ie gt-ie10';
  }
  return '';
};

app.get('/pintrest-proxy/*', requestProxy({
  url: `${config.pintrestApiUrl}*`,
  query: {
    access_token: process.env.PINTREST_ACCESS_TOKEN,
  },
}));

app.get('/login/silent-callback', (req, res) => {
  res.send('<!doctype html>\n' + renderToString(<Auth0SilentCallback />)); // eslint-disable-line
});

app.get('/is_token_valid', (req, res) => {
  const idTokenExp = req.query.tokenExp;
  res.send({ isTokenExpired: isTokenExpired(idTokenExp) });
});

app.get('/get_token', (req, res) => {
  getToken().then((token) => {
    res.send(token);
  }).catch(err => res.status(500).send(err.message));
});

app.get('*', (req, res) => {
  function renderOnClient() {
    getToken().then((token) => {
      const paths = req.url.split('/');
      const lang = getHtmlLang(defined(paths[1], ''));
      res.send('<!doctype html>\n' + renderToString(<Html lang={lang} className={findIEClass(req.headers['user-agent'])} token={token}/>)); // eslint-disable-line
    }).catch(err => res.status(500).send(err.message));
  }

  renderOnClient();
});

module.exports = app;
