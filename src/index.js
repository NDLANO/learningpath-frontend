import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import es6promise from 'es6-promise';
es6promise.polyfill();

import actions from './actions';
import { defaultSearchQuery, parseSearchQuery } from './middleware/searchQuery';
import configureStore, { browserHistory } from './configureStore';

const store = configureStore({
  authenticated: false,
  authToken: '',
  user: {},
  learningPath: {},
  learningPathStep: {},
  learningPaths: [],
  learningPathQuery: defaultSearchQuery,
  learningPathsTotalCount: 1,
  privateLearningPath: {},
  privateLearningPathStep: {},
  privateLearningPaths: [],
  editingLearningPath: {},
  messages: []
});

const {
  logout,
  fetchPrivateLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPathStep,
  fetchLearningPaths,
  fetchLearningPath,
  fetchLearningPathStep,
  fetchEditingLearningPath,
  changeLearningPathQuery,
  createEmptyEditingPath
} = bindActionCreators(actions, store.dispatch);

function ifAuthenticated (cb) {
  return function (...args) {
    if (store.getState().authenticated) {
      return cb(...args);
    }
  };
}

import App from './components/App';
import {
  Welcome, NotFound,
  LoginProviders, SessionInitializer, LoginFailure,
  MyPage,
  LearningPath, LearningPathSummary, LearningPathStep,
  LearningPathSearch,
  EditLearningPath,
  CreateLearningPath
} from './components';
import requireAuthentication from './components/requireAuthentication';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/'>
        <IndexRoute component={Welcome} />

        <Route component={App}>
          <Route path='login' component={LoginProviders} />
          <Route path='login/success/:authToken' component={SessionInitializer} />
          <Route path='login/failure' component={LoginFailure} />
          <Route path='logout' onEnter={ifAuthenticated(logout)} component={LoginProviders} />
          <Route path='minside' component={requireAuthentication(MyPage)} onEnter={ifAuthenticated(fetchPrivateLearningPaths)} />

          <Route path='learningpaths/private/new' component={requireAuthentication(CreateLearningPath)}
            onEnter={ifAuthenticated(createEmptyEditingPath)}/>
          <Route path='learningpaths/private/:pathId' component={requireAuthentication(LearningPath)} isPrivate={true}
            onEnter={ifAuthenticated(({params}) => fetchPrivateLearningPath(params.pathId))}>
            <IndexRoute component={LearningPathSummary} isPrivate={true} />
            <Route path='step/:stepId' component={requireAuthentication(LearningPathStep)} isPrivate={true} 
              onEnter={ifAuthenticated(
                ({params}) => fetchPrivateLearningPathStep(params.pathId, params.stepId)
              )}/>
          </Route>
          <Route path='learningpaths/private/:pathId/edit' component={requireAuthentication(EditLearningPath)}
             onEnter={ifAuthenticated(({params}) => fetchEditingLearningPath(params.pathId))} />

          <Route path='learningpaths' component={LearningPathSearch} onEnter={ctx => {
            let query = parseSearchQuery( ctx.location.query );
            if (isEmpty(query)) {
              query = defaultSearchQuery;
            }

            changeLearningPathQuery(query);
            fetchLearningPaths();
          }}/>

          <Route path='learningpaths/:pathId' component={LearningPath}
            onEnter={({params}) => fetchLearningPath(params.pathId)}>
            <IndexRoute component={LearningPathSummary} />
            <Route path='step/:stepId' component={LearningPathStep}
              onEnter={({params}) => fetchLearningPathStep(params.pathId, params.stepId)} />
          </Route>

          <Route path='*' component={NotFound} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
