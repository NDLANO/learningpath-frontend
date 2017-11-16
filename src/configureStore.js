/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import { errorReporter } from './middleware';

const slicer = paths =>
  // custom slicer because default slicer does not store falsy values
  state =>
    paths.reduce((acc, path) => {
      // eslint-disable-next-line no-param-reassign
      acc[path] = state[path];
      return acc;
    }, {});

export default function configureStore(initialState, history) {
  const middleware = routerMiddleware(history);
  const createFinalStore = compose(
    applyMiddleware(thunkMiddleware, errorReporter, middleware),
    __CLIENT__
      ? persistState(['authenticated', 'accessToken', 'user', 'accessToken'], {
          key: 'ndla:sti',
          slicer,
        })
      : f => f,
    __CLIENT__ && window && window.devToolsExtension
      ? window.devToolsExtension()
      : f => f,
  )(createStore);

  return createFinalStore(reducers, initialState);
}
