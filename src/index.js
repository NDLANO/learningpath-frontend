import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import isEmpty from 'lodash/isEmpty';

import es6promise from 'es6-promise';
es6promise.polyfill();

import { errorReporter } from './middleware';
import reducers from './reducers';
import actions from './actions';

const createPersistentStore = compose(
  persistState(['authenticated', 'authToken', 'user', 'lang'], {
    key: 'ndla:sti',
    slicer: function (paths) {
      // custom slicer because default slicer does not store falsy values
      return (state) => paths.reduce((acc, path) => {
        acc[path] = state[path];
        return acc;
      }, {});
    }
  })
)(createStore);

const defaultSearchQuery = {
  page: 1,
  pageSize: 10,
  sort: '-lastUpdated',
  query: ''
};

const fixupQuery = (query) => Object.keys(query).reduce((obj, key) => {
  switch (key) {
  case 'page':
  case 'pageSize':
    obj[key] = parseInt(query[key]);
    break;
  default:
    obj[key] = query[key];
  }
  return obj;
}, {});

const changeLearningPathQueryFromLocation = store => next => action => {
  if (action.type === '@@router/UPDATE_LOCATION' && action.payload.pathname === '/learningpaths') {
    let query = fixupQuery(action.payload.query);
    if (isEmpty(query)) {
      query = defaultSearchQuery;
    }
    store.dispatch(actions.changeLearningPathQuery(query));
  }
  return next(action);
};

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    changeLearningPathQueryFromLocation,
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
  learningPathQuery: defaultSearchQuery,
  learningPathsTotalCount: 1,
  privateLearningPath: {},
  privateLearningPathStep: {},
  privateLearningPaths: [],
  editingLearningPath: {}
});

//store.subscribe(() => console.log(store.getState().editingLearningPath));

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
  CreateLearningPath,
  ThisPageIntentionallyLeftBlank
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
            let query = Object.assign({}, fixupQuery( ctx.location.query ));
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

          <Route path='messages' component={ThisPageIntentionallyLeftBlank} />

          <Route path='*' component={NotFound} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
