import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import reducers from './reducers';

const history = createHistory();
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));
const store = createStore(reducer, {
  authToken: '',
  user: {}
});

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
