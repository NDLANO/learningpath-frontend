/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureTracker } from 'ndla-tracker';
import createHistory from 'history/createBrowserHistory';
import ErrorReporter from 'ndla-error-reporter';
import isEmpty from 'lodash/isEmpty';
import TokenStatusHandler from './util/TokenStatusHandler';
import { configureLocale, isValidLocale } from './locale/configureLocale';
import configureStore from './configureStore';
import App from './main/App';
import {
  saveAccessToken,
  getSessionFromLocalStorage,
} from './sources/localStorage';

import { getTokenExpireAt } from './util/jwtHelper';
import config from './config';

function generateBasename(path) {
  if (isValidLocale(path)) {
    return `/${path}/`;
  }
  return undefined;
}

const paths = window.location.pathname.split('/');
const path = paths.length > 2 ? paths[1] : '/';
const locale = paths.length > 2 && isValidLocale(paths[1]) ? paths[1] : 'nb';

configureLocale(locale);
const basename = generateBasename(path);

const browserHistory = basename ? createHistory({ basename }) : createHistory();

const emptyState = {
  learningPathStep: {},
  learningPaths: [],
  messages: [],
  locale,
};

const tokenStoredOnServer =
  !isEmpty(window.initialState) &&
  window.initialState.accessToken &&
  window.initialState.accessToken.token;

const { token, authenticated } = getSessionFromLocalStorage();

if (!token && tokenStoredOnServer) {
  saveAccessToken({
    token: tokenStoredOnServer,
    expires: getTokenExpireAt(tokenStoredOnServer),
  });
}

const initialState = {
  ...emptyState,
  authenticated: authenticated === 'true',
};

const store = configureStore(initialState, browserHistory);

const { logglyApiKey, logEnvironment, componentName, disableSSR } = config;

window.errorReporter = ErrorReporter.getInstance({
  store,
  logglyApiKey,
  environment: logEnvironment,
  componentName,
  ignoreUrls: [/https:\/\/.*hotjar\.com.*/],
});

TokenStatusHandler.getInstance({ store });

configureTracker({
  listen: browserHistory.listen,
  gaTrackingId: config.gaTrackingId,
  googleTagManagerId: config.googleTagManagerId,
});

const renderOrHydrate = disableSSR ? ReactDOM.render : ReactDOM.hydrate;

renderOrHydrate(
  <Provider store={store} locale={locale}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app-container'),
);
