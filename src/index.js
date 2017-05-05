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
import TokenStatusHandler from './util/TokenStatusHandler';
import { configureLocale, isValidLocale } from './locale/configureLocale';
import configureStore from './configureStore';
import { accessToken } from './sources/helpers';
import App from './main/App';

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

const store = configureStore({
  authenticated: false,
  accessToken,
  idToken: '',
  user: {},
  learningPathStep: {},
  learningPaths: [],
  messages: [],
  locale,
}, browserHistory);

const { logglyApiKey, logEnvironment, componentName } = window.config;
window.errorReporter = ErrorReporter.getInstance({ store, logglyApiKey, environment: logEnvironment, componentName });
window.tokenStatusHandler = TokenStatusHandler.getInstance({ store });

ReactDOM.render(
  <Provider store={store} locale={locale}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app-container')
);
