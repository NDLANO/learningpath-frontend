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
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';
import ErrorReporter from 'ndla-error-reporter';

import { configureLocale, isValidLocale } from './locale/configureLocale';
import configureStore from './configureStore';
import configureRoutes from './main/routes';
import { defaultApiKey } from './sources/helpers';


function configureBrowserHistory(path) {
  if (isValidLocale(path)) {
    const basename = `/${path}/`;
    return useRouterHistory(createHistory)({
      basename,
    });
  }
  return useRouterHistory(createHistory)();
}

const paths = window.location.pathname.split('/');
const path = paths.length > 2 ? paths[1] : '/';
const locale = paths.length > 2 && isValidLocale(paths[1]) ? paths[1] : 'nb';

configureLocale(locale);
const browserHistory = configureBrowserHistory(path);

const store = configureStore({
  authenticated: false,
  authToken: defaultApiKey,
  user: {},
  learningPathStep: {},
  learningPaths: [],
  messages: [],
  locale,
}, browserHistory);

const { logglyApiKey, logEnvironment, componentName } = window.config;
window.ErrorReporter = ErrorReporter.getInstance({ store, logglyApiKey, environment: logEnvironment, componentName });

const history = syncHistoryWithStore(browserHistory, store);
const routes = configureRoutes(store);

ReactDOM.render(
  <Provider store={store} locale={locale}>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app-container')
);
