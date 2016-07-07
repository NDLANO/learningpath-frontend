import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import defined from 'defined';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config';
import { getHtmlLang } from '../src/locale/configureLocale';
import Html from './Html';

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

app.use(express.static('htdocs'));

app.get('*', (req, res) => {
  function renderOnClient() {
    const paths = req.url.split('/');
    const lang = getHtmlLang(defined(paths[1], ''));
    res.send('<!doctype html>\n' + renderToString(<Html lang={lang}/>)); // eslint-disable-line
  }


  renderOnClient();
  return;
});

module.exports = app;
