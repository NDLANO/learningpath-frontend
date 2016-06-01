import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import es6promise from 'es6-promise';
es6promise.polyfill();
import { defaultSearchQuery } from './middleware/searchQuery';
import configureStore from './configureStore';
import configureRoutes from './main/routes';
import {defaultApiKey} from './sources/helpers';


const store = configureStore({
  authenticated: false,
  authToken: defaultApiKey,
  user: {},
  learningPath: {},
  learningPathStep: {},
  learningPaths: [],
  learningPathQuery: defaultSearchQuery,
  learningPathsTotalCount: 1,
  messages: []
});

const routes = configureRoutes(store);

const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
