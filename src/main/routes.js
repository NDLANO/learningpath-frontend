/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';

import App from './App';
import Welcome from './Welcome';
import NotFound from './NotFound';
import MyPage from './MyPage';

import LoginProviders from '../session/LoginProviders';

import actions from '../actions';
import requireAuthentication from '../session/requireAuthentication';
import configureLearningPathRoutes from '../learningPath/routes';
import loginRoutes from '../session/routes';

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
    <Route path="/" component={App} onEnter={ifAuthenticated(checkValidSession)}>
      <IndexRoute component={Welcome} />
      {loginRoutes}
      <Route path="logout" onEnter={ifAuthenticated(logout)} component={LoginProviders} />
      <Route path="minside" component={requireAuthentication(MyPage)} onEnter={ifAuthenticated(fetchMyLearningPaths)} />
      {learningPathRoutes}
      <Route path="*" component={NotFound} />
    </Route>
  );
}
