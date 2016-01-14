import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import { Router, Route, IndexRoute } from 'react-router';
import es6promise from 'es6-promise';
import createHistory from 'history/lib/createBrowserHistory';

es6promise.polyfill();

import store from './store';
const history = createHistory();
syncReduxAndRouter(history, store);

import App from './containers/App';
import { Welcome, LoginProviders, AuthTokenSetter } from './components';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Welcome} />
        <Route path='login' component={LoginProviders} />
        <Route path='login/success/:authToken' component={AuthTokenSetter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
