import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureLocale, isValidLocale } from './locale/configureLocale';
import { defaultSearchQuery } from './middleware/searchQuery';
import configureStore from './configureStore';
import configureRoutes from './main/routes';
import {defaultApiKey} from './sources/helpers';
import { createHistory } from 'history';


function configureBrowserHistory(path) {
  if (isValidLocale(path)) {
    const basename = `/${path}/`;
    return useRouterHistory(createHistory)({
      basename
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
  learningPathQuery: defaultSearchQuery,
  learningPathsTotalCount: 1,
  messages: [],
  locale,
}, browserHistory);


const history = syncHistoryWithStore(browserHistory, store);
const routes = configureRoutes(store);

ReactDOM.render(
  <Provider store={store} locale={locale}>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
