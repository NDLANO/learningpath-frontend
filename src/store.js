import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
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
    errorReporter
)(createPersistentStore);

const store = createStoreWithMiddleware(reducers, {
  authenticated: false,
  authToken: '',
  lang: 'nb',
  user: {},
  privateLearningPaths: []
});

export default store;
