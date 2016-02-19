import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import get from 'lodash/get';

import es6promise from 'es6-promise';
es6promise.polyfill();

import { errorReporter } from './middleware';
import reducers from './reducers';

const createPersistentStore = compose(
  persistState(
    ['authenticated', 'authToken', 'user', 'lang'],
    {
      key: 'ndla:sti',
      slicer: function (paths) {
        // custom slicer because default slicer does not store falsy values
        return (state) => paths.reduce((acc, path) => {
          acc[path] = state[path];
          return acc;
        }, {});
      }
    }
  )
)(createStore);

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    errorReporter,
    syncHistory(browserHistory)
)(createPersistentStore);

const store = createStoreWithMiddleware(reducers, {
  authenticated: false,
  authToken: '',
  lang: 'nb',
  user: {},
  learningPath: {},
  learningPathStep: {},
  learningPaths: [],
  learningPathQuery: {
    page: 1,
    pageSize: 50,
    sort: '-lastUpdated'
  },
  privateLearningPath: {},
  privateLearningPathStep: {},
  privateLearningPaths: []
});

import actions from './actions';
const {
  fetchPrivateLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPathStep,
  fetchLearningPaths,
  fetchLearningPath,
  fetchLearningPathStep,
  changeLearningPathQuery
} = bindActionCreators(actions, store.dispatch);

function ifAuthenticated (cb) {
  return function (...args) {
    if (store.getState().authenticated) {
      return cb(...args);
    }
  };
}

import App from './containers/App';
import {
  Welcome, NotFound,
  LoginProviders, SessionInitializer, LoginFailure,
  MyPage,
  LearningPath, LearningPathSummary, LearningPathStep,
  LearningPathSearch,
  EditLearningPath
} from './components';
import requireAuthentication from './components/requireAuthentication';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Welcome} />

        <Route path='login' component={LoginProviders} />
        <Route path='login/success/:authToken' component={SessionInitializer} />
        <Route path='login/failure' component={LoginFailure} />
        <Route path='minside' component={requireAuthentication(MyPage)} onEnter={ifAuthenticated(fetchPrivateLearningPaths)} />

        <Route path='learningpaths/private/:pathId' component={requireAuthentication(LearningPath)} isPrivate={true}
          onEnter={ifAuthenticated(({params}) => fetchPrivateLearningPath(params.pathId))}>
          <IndexRoute component={LearningPathSummary} isPrivate={true} />
          <Route path='step/:stepId' component={requireAuthentication(LearningPathStep)}
            onEnter={ifAuthenticated(
              ({params}) => fetchPrivateLearningPathStep(params.pathId, params.stepId)
            )}/>
        </Route>
        <Route path='learningpaths/private/:pathId/edit' component={requireAuthentication(EditLearningPath)}
           onEnter={ifAuthenticated(({params}) => fetchPrivateLearningPath(params.pathId))} />

        <Route path='learningpaths' component={LearningPathSearch} onEnter={ctx => {
          let page = parseInt(get(ctx, 'location.query.page', 1));
          changeLearningPathQuery({page});
          fetchLearningPaths();
        }} />

        <Route path='learningpaths/:pathId' component={LearningPath}
          onEnter={({params}) => fetchLearningPath(params.pathId)}>
          <IndexRoute component={LearningPathSummary} />
          <Route path='step/:stepId' component={LearningPathStep}
            onEnter={({params}) => fetchLearningPathStep(params.pathId, params.stepId)} />
        </Route>

        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
