import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import { errorReporter } from './middleware';


const slicer = (paths) =>
  // custom slicer because default slicer does not store falsy values
  (state) => paths.reduce((acc, path) => {
    // eslint-disable-next-line no-param-reassign
    acc[path] = state[path];
    return acc;
  }, {});

export default function configureStore(initialState, history) {
  const middleware = routerMiddleware(history);

  const createFinalStore = compose(
    applyMiddleware(
      thunkMiddleware,
      errorReporter,
      middleware
    ),
    __CLIENT__ ? persistState(['authenticated', 'authToken', 'user'], { key: 'ndla:sti', slicer }) : f => f,
    __CLIENT__ && window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return createFinalStore(reducers, initialState);
}
