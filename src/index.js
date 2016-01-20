import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import { Router, Route, IndexRoute } from 'react-router';
import es6promise from 'es6-promise';
import createHistory from 'history/lib/createBrowserHistory';
import useBasename from 'history/lib/useBasename';

es6promise.polyfill();

import store from './store';
const history = useBasename(createHistory)({ basename: '/learningpath' });
syncReduxAndRouter(history, store);

import actions from './actions';
const { fetchPrivateLearningPaths } = bindActionCreators(actions, store.dispatch);

function ifAuthenticated (cb) {
  return function () {
    if (store.getState().authenticated) {
      return cb();
    }
  };
}

import App from './containers/App';
import { Welcome, LoginProviders, AuthTokenSetter, LoginFailure, MyPage } from './components';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Welcome} />
        <Route path='login' component={LoginProviders} />
        <Route path='login/success/:authToken' component={AuthTokenSetter} />
        <Route path='login/failure' component={LoginFailure} />
        <Route path='minside' component={MyPage} onEnter={ifAuthenticated(fetchPrivateLearningPaths)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
