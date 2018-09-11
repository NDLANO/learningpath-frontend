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
import helmet from 'helmet';
import compression from 'compression';
import requestProxy from 'express-request-proxy';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import {
  OK,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  NOT_FOUND,
  NOT_ACCEPTABLE,
} from 'http-status';
import App from '../main/App';
import config, { getEnvironmentVariabel } from '../config';
import { getHtmlLang, isValidLocale } from '../locale/configureLocale';
import Html from './Html';
import { getToken, getUsers } from './auth';
import Auth0SilentCallback from './Auth0SilentCallback';
import configureStore from '../configureStore';
import { serverRoutes } from './serverRoutes';
import TokenStatusHandler from '../util/TokenStatusHandler';
import contentSecurityPolicy from './contentSecurityPolicy';
import errorLogger from '../util/logger';
import { getTokenExpireAt } from '../util/jwtHelper';

const app = express();
const allowedBodyContentTypes = ['application/csp-report', 'application/json'];

app.use(
  bodyParser.json({
    type: req => allowedBodyContentTypes.includes(req.headers['content-type']),
  }),
);

app.use(compression());
app.use(
  express.static(process.env.RAZZLE_PUBLIC_DIR, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // One year
  }),
);

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    contentSecurityPolicy,
    frameguard:
      process.env.NODE_ENV !== 'development'
        ? {
            action: 'allow-from',
            domain: 'https://*.hotjar.com',
          }
        : undefined,
  }),
);

const getConditionalClassnames = userAgentString => {
  if (userAgentString && userAgentString.indexOf('MSIE') >= 0) {
    return 'ie lt-ie11';
  }
  if (userAgentString && userAgentString.indexOf('Trident/7.0; rv:11.0') >= 0) {
    return 'ie gt-ie10';
  }
  return '';
};

const renderHtmlString = (
  locale,
  userAgentString,
  state = {},
  component = undefined,
) =>
  renderToString(
    <Html
      lang={locale}
      state={state}
      userAgentString={userAgentString}
      component={component}
      className={getConditionalClassnames(userAgentString)}
    />,
  );

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

app.get('/health', (req, res) => {
  res.status(OK).send('Health check OK');
});

app.get(
  '/pinterest-proxy/*',
  requestProxy({
    url: `${config.pinterestApiUrl}*`,
    query: {
      access_token: getEnvironmentVariabel('PINTEREST_ACCESS_TOKEN'),
    },
  }),
);

app.get(
  '/get_owners',
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      jwksUri: `https://${config.auth0Domain}/.well-known/jwks.json`,
    }),
    audience: 'ndla_system',
    issuer: `https://${config.auth0Domain}/`,
    algorithms: ['RS256'],
  }),
  async (req, res) => {
    const {
      user,
      query: { ownerIds },
    } = req;
    const isAdmin = user && user.scope.includes('learningpath-test:admin');
    if (!isAdmin) {
      res
        .status(FORBIDDEN)
        .json({ status: FORBIDDEN, text: 'No access allowed' });
    } else {
      try {
        const managementToken = await getToken(config.auth0Api);
        const users = await getUsers(managementToken, ownerIds);
        res.status(OK).json(users);
      } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send(err.message);
      }
    }
  },
);

app.get('/login/silent-callback', (req, res) => {
  res.send('<!doctype html>\n' + Auth0SilentCallback); // eslint-disable-line
});

app.get('/get_token', (req, res) => {
  getToken('ndla_sytem')
    .then(token => {
      res.send(token);
    })
    .catch(err => res.status(INTERNAL_SERVER_ERROR).send(err.message));
});

app.post('/csp-report', (req, res) => {
  const { body } = req;
  if (body && body['csp-report']) {
    const cspReport = body['csp-report'];
    const errorMessage = `Refused to load the resource because it violates the following Content Security Policy directive: ${
      cspReport['violated-directive']
    }`;
    errorLogger.error(errorMessage, cspReport);
    res.status(OK).json({ status: OK, text: 'CSP Error recieved' });
  } else {
    res
      .status(NOT_ACCEPTABLE)
      .json({ status: NOT_ACCEPTABLE, text: 'CSP Error not recieved' });
  }
});

function prefetchData(req, dispatch) {
  const promises = [];
  serverRoutes.forEach(route => {
    const match = matchPath(req.url, route);
    if (match && route.component.fetchData) {
      promises.push(
        route.component.fetchData({
          match,
          location: { search: req.query },
          ...bindActionCreators(route.component.mapDispatchToProps, dispatch),
        }),
      );
    }
    return match;
  });
  return Promise.all(promises);
}

function handleResponse(req, res, token) {
  const paths = req.url.split('/');
  const locale = getHtmlLang(paths[1]);
  const userAgentString = req.headers['user-agent'];
  const match = serverRoutes.find(r => matchPath(req.url, r));
  // eslint-disable-next-line no-underscore-dangle
  const storedTokenInfo = {
    token: token.access_token,
    expiresAt: getTokenExpireAt(token.access_token),
  };
  if (config.disableSSR || match.notFound) {
    const htmlString = renderHtmlString(locale, userAgentString, {
      accessToken: storedTokenInfo,
      locale,
    });
    res.send(`<!doctype html>\n${htmlString}`);
    return;
  }

  const basename = isValidLocale(paths[1]) ? `${paths[1]}` : '';

  const store = configureStore({ locale, accessToken: storedTokenInfo });
  TokenStatusHandler.getInstance({ store });

  const context = {};
  const component = (
    <Provider store={store} locale={locale}>
      <StaticRouter basename={basename} location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    prefetchData(req, store.dispatch)
      .then(() => {
        const htmlString = renderHtmlString(
          locale,
          userAgentString,
          store.getState(),
          component,
        );
        res.send(`<!doctype html>\n${htmlString}`);
      })
      .catch(err => {
        if (
          err &&
          (err.status === FORBIDDEN || err.status === NOT_FOUND) &&
          err.redirectPath
        ) {
          res.redirect(err.redirectPath);
        } else {
          res.redirect('/');
        }
      });
  }
}

app.get('/*', (req, res) => {
  getToken('ndla_system')
    .then(token => {
      handleResponse(req, res, token);
    })
    .catch(err => res.status(INTERNAL_SERVER_ERROR).send(err.message));
});

export default app;
