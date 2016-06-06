import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';

import App from '../components/App';
import {
  Welcome, NotFound,
  LoginProviders, SessionInitializer, LoginFailure,
  MyPage
} from '../components';

import actions from '../actions';
import requireAuthentication from '../components/requireAuthentication';
import configureLearningPathRoutes from '../learningPath/routes';

export default function (store) {
  function ifAuthenticated(cb) {
    return (...args) => {
      if (store.getState().authenticated) {
        return cb ? cb(...args) : undefined;
      }
      return undefined;
    };
  }

  const {
    logout,
    fetchMyLearningPaths,
    checkValidSession,
  } = bindActionCreators(actions, store.dispatch);
  const learningPathRoutes = configureLearningPathRoutes(store, ifAuthenticated);

  return (
    <Route path="/" onEnter={ifAuthenticated(checkValidSession)}>
      <IndexRoute component={Welcome} />
      <Route component={App}>
        <Route path="login" component={LoginProviders} />
        <Route path="login/success/:authToken" component={SessionInitializer} />
        <Route path="login/failure" component={LoginFailure} />
        <Route path="logout" onEnter={ifAuthenticated(logout)} component={LoginProviders} />
        <Route path="minside" component={requireAuthentication(MyPage)} onEnter={ifAuthenticated(fetchMyLearningPaths)} />
        {learningPathRoutes}
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
  );
}
