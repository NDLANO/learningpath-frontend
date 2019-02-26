/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express from 'express';
import helmet from 'helmet';
import requestProxy from 'express-request-proxy';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import compression from 'compression';
import {
  OK,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  NOT_ACCEPTABLE,
  MOVED_PERMANENTLY,
  TEMPORARY_REDIRECT,
} from 'http-status';
import config, { getEnvironmentVariabel } from '../config';
import { getToken, getUsers } from './helpers/auth';
import Auth0SilentCallback from './helpers/Auth0SilentCallback';
import contentSecurityPolicy from './contentSecurityPolicy';
import errorLogger from '../util/logger';
import { errorRoute, defaultRoute } from './routes';

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
  }),
);

app.enable('trust proxy');

async function sendInternalServerError(req, res) {
  if (res.getHeader('Content-Type') === 'application/json') {
    res.status(INTERNAL_SERVER_ERROR).json('Internal server error');
  } else {
    const { data } = await errorRoute(req);
    res.status(INTERNAL_SERVER_ERROR).send(data);
  }
}

function sendResponse(res, data, status = OK) {
  if (status === MOVED_PERMANENTLY || status === TEMPORARY_REDIRECT) {
    res.writeHead(status, data);
    res.end();
  } else if (res.getHeader('Content-Type') === 'application/json') {
    res.status(status).json(data);
  } else {
    res.status(status).send(data);
  }
}

async function handleRequest(req, res, route) {
  try {
    const token = await getToken();
    // storeAccessToken(token.access_token);
    try {
      const { data, status } = await route(req, res, token);
      sendResponse(res, data, status);
    } catch (err) {
      errorLogger.error(err);
      await sendInternalServerError(req, res);
    }
  } catch (err) {
    errorLogger.error(err);
    await sendInternalServerError(req, res);
  }
}

app.get('/robots.txt', (req, res) => {
  if (req.hostname === 'stier.ndla.no') {
    res.sendFile('robots.txt', { root: './build/' });
  } else {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
  }
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

    const isAdmin = user && user.scope.includes(`learningpath:admin`);

    if (!isAdmin) {
      res
        .status(FORBIDDEN)
        .json({ status: FORBIDDEN, text: 'No access allowed' });
    } else {
      try {
        const managementToken = await getToken(`${config.auth0Url}/api/v2/`);
        const users = await getUsers(managementToken, ownerIds);
        res.status(OK).json(users);
      } catch (err) {
        sendInternalServerError(req, res);
        errorLogger.error(err);
      }
    }
  },
);

app.get('/login/silent-callback', (req, res) => {
  res.send('<!doctype html>\n' + Auth0SilentCallback); // eslint-disable-line
});

app.get('/get_token', async (req, res) => {
  try {
    const token = await getToken('ndla_system');
    res.send(token);
  } catch (err) {
    errorLogger.error(err);
    sendInternalServerError(req, res);
  }
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

app.get('/*', (req, res) => {
  handleRequest(req, res, defaultRoute);
});

export default app;
