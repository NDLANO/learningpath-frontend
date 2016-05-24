import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducers from './reducers';
import { errorReporter, searchQueryMiddleware } from './middleware';

import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';


const slicer = (paths) =>
  // custom slicer because default slicer does not store falsy values
  (state) => paths.reduce((acc, path) => {
    // eslint-disable-next-line no-param-reassign
    acc[path] = state[path];
    return acc;
  }, {});

const middleware = routerMiddleware(browserHistory);
const createFinalStore = compose(
  applyMiddleware(
    thunkMiddleware,
    searchQueryMiddleware,
    errorReporter,
    middleware
  ),
  persistState(['authenticated', 'authToken', 'user'], { key: 'ndla:sti', slicer }),
  window && window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


export default function configureStore(initialState) {
  return createFinalStore(reducers, initialState);
}
