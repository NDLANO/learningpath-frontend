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
import { configureTracker } from '@ndla/tracker';
import ErrorReporter from '@ndla/error-reporter';
import { hydrate } from 'emotion';
import isEmpty from 'lodash/isEmpty';
import TokenStatusHandler from './util/TokenStatusHandler';
import { configureLocale, isValidLocale } from './locale/configureLocale';
import configureStore from './configureStore';
import App from './main/App';
import { isUserAuthenticated } from './sources/localStorage';

import { createHistory } from './history';

function generateBasename(path) {
  if (isValidLocale(path)) {
    return `/${path}/`;
  }
  return undefined;
}
const {
  DATA: { config, ids },
} = window;

const paths = window.location.pathname.split('/');
const path = paths.length > 2 ? paths[1] : '/';
const locale = paths.length > 2 && isValidLocale(paths[1]) ? paths[1] : 'nb';

hydrate(ids);
configureLocale(locale);
const basename = generateBasename(path);

const browserHistory = createHistory(basename);

const authenticated = isUserAuthenticated();

const emptyState = {
  learningPathStep: {},
  learningPaths: [],
  messages: [],
  locale,
  authenticated,
};

const initialState = !isEmpty(window.initialState)
  ? {
      ...window.initialState,
      authenticated,
    }
  : emptyState;

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
  gaTrackingId: undefined,
  googleTagManagerId: config.googleTagManagerId,
});

const renderOrHydrate = disableSSR ? ReactDOM.render : ReactDOM.hydrate;

const render = Component =>
  renderOrHydrate(
    <Provider store={store} locale={locale}>
      <Router history={browserHistory}>
        <Component />
      </Router>
    </Provider>,
    document.getElementById('app-container'),
  );

render(App);

if (module.hot) {
  module.hot.accept('./main/App.js', () => {
    render(App);
  });

  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}
