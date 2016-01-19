import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import { Router, Route, IndexRoute } from 'react-router';
import { createAction } from 'redux-actions';
import es6promise from 'es6-promise';
import createHistory from 'history/lib/createBrowserHistory';
import useBasename from 'history/lib/useBasename';

es6promise.polyfill();

import store from './store';
const history = useBasename(createHistory)({ basename: '/learningpath' });
syncReduxAndRouter(history, store);

store.dispatch( createAction('RESTORE_SESSION')() );

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
        <Route path='minside' component={MyPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
