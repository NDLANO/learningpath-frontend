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
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import requestProxy from 'express-request-proxy';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import App from '../src/main/App';

import config from '../src/config';
import webpackConfig from '../webpack.config.dev';
import { getHtmlLang, isValidLocale } from '../src/locale/configureLocale';
import Html from './Html';
import { getToken, isTokenExpired, getExpireTime } from './auth';
import Auth0SilentCallback from './Auth0SilentCallback';
import configureStore from '../src/configureStore';
import { serverRoutes } from './serverRoutes';

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
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  if (process.env.NODE_ENV !== 'development') {
    res.setHeader(
      'Content-Security-Policy',
      'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://*.ndla.no https://players.brightcove.net https://www.nrk.no https://www.googletagmanager.com https://www.google-analytics.com https://www.youtube.com https://s.ytimg.com https://cdn.auth0.com; style-src \'self\' https://fonts.googleapis.com https://fonts.gstatic.com; font-src \'self\' https://fonts.googleapis.com https://fonts.gstatic.com; connect-src \'self\' https://*.ndla.no https://logs-01.loggly.com https://www.googleapis.com; img-src https://*.ndla.no https://www.google-analytics.com https://stats.g.doubleclick.net data: https://i.ytimg.com https://pi.tedcdn.com http://*.ndlap3.seria.net; frame-src *;');
  }
  next();
});


const getConditionalClassnames = (userAgentString) => {
  if (userAgentString.indexOf('MSIE') >= 0) {
    return 'ie lt-ie11';
  } else if (userAgentString.indexOf('Trident/7.0; rv:11.0') >= 0) {
    return 'ie gt-ie10';
  }
  return '';
};

const renderHtmlString = (locale, userAgentString, state = {}, component = undefined) =>
  renderToString(<Html lang={locale} state={state} component={component} className={getConditionalClassnames(userAgentString)} />);

app.get('/pinterest-proxy/*', requestProxy({
  url: `${config.pinterestApiUrl}*`,
  query: {
    access_token: process.env.PINTEREST_ACCESS_TOKEN,
  },
}));

app.get('/login/silent-callback', (req, res) => {
  res.send('<!doctype html>\n' + Auth0SilentCallback); // eslint-disable-line
});

app.get('/is_token_valid', (req, res) => {
  const idTokenExp = req.query.tokenExp;
  res.send({ isTokenExpired: isTokenExpired(idTokenExp), expiresIn: getExpireTime(idTokenExp) });
});

app.get('/get_token', (req, res) => {
  getToken().then((token) => {
    res.send(token);
  }).catch(err => res.status(500).send(err.message));
});

function prefetchData(req, dispatch) {
  const promises = [];

  serverRoutes.forEach((route) => {
    const match = matchPath(req.url, route);
    if (match && route.component.fetchData) {
      promises.push(route.component.fetchData({
        match,
        location: { search: req.query },
        ...bindActionCreators(route.component.mapDispatchToProps, dispatch),
      }));
    }
    return match;
  });
  return Promise.all(promises);
}

function handleResponse(req, res, token) {
  const paths = req.url.split('/');
  const locale = getHtmlLang(paths[1]);
  const userAgentString = req.headers['user-agent'];

  if (global.__DISABLE_SSR__) { // eslint-disable-line no-underscore-dangle
    const htmlString = renderHtmlString(locale, userAgentString, { accessToken: token.access_token, locale });
    res.send(`<!doctype html>\n${htmlString}`);
    return;
  }

  const basename = isValidLocale(paths[1]) ? `${paths[1]}` : '';

  const store = configureStore({ locale, accessToken: token.access_token });

  const context = {};
  const component =
    (<Provider store={store} locale={locale}>
      <StaticRouter
        basename={basename}
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>);

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    prefetchData(req, store.dispatch).then(() => {
      const htmlString = renderHtmlString(locale, userAgentString, store.getState(), component);
      res.send(`<!doctype html>\n${htmlString}`);
    }).catch((err) => {
      if (err && (err.status === 403 || err.status === 404) && err.redirectPath) {
        res.redirect(err.redirectPath);
      } else {
        res.redirect('/');
      }
    });
  }
}


app.get('*', (req, res) => {
  getToken().then((token) => {
    handleResponse(req, res, token);
  }).catch(err => res.status(500).send(err.message));
});

module.exports = app;
