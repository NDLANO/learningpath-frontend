import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Html from './Html';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    stats: {
      colors: true
    },
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler, {}));
}

app.use(express.static('htdocs'));

app.get('*', (req, res) => {
  function renderOnClient() {
    res.send('<!doctype html>\n' + renderToString(<Html lang="no_NB"/>)); // eslint-disable-line
  }

  if (__DISABLE_SSR__) {
    renderOnClient();
    return;
  }

  // TODO: Server side rendering
});

module.exports = app;
