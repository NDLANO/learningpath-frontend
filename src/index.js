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
import createHistory from 'history/createBrowserHistory';
import ErrorReporter from 'ndla-error-reporter';
import isEmpty from 'lodash/isEmpty';
import TokenStatusHandler from './util/TokenStatusHandler';
import { configureLocale, isValidLocale } from './locale/configureLocale';
import configureStore from './configureStore';
import App from './main/App';
import { getTokenExpireAt } from './util/jwtHelper';

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
  authenticated: false,
  accessToken: {},
  learningPathStep: {},
  learningPaths: [],
  messages: [],
  locale,
};

const initialState =
  !isEmpty(window.initialState) && window.initialState.accessToken
    ? {
        ...window.initialState,
        accessToken: {
          token: window.initialState.accessToken,
          expiresAt: getTokenExpireAt(window.initialState.accessToken),
        },
      }
    : emptyState;

const store = configureStore(initialState, browserHistory);

const { logglyApiKey, logEnvironment, componentName } = window.config;
window.errorReporter = ErrorReporter.getInstance({
  store,
  logglyApiKey,
  environment: logEnvironment,
  componentName,
});
TokenStatusHandler.getInstance({ store });

ReactDOM.hydrate(
  <Provider store={store} locale={locale}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app-container'),
);
