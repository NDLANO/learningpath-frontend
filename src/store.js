import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

const errorReporter = store => next => action => {
  if (action.error) {
    console.error(action.payload, action, store.getState()); // eslint-disable-line no-console
  }

  return next(action);
};

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, errorReporter)(createStore);

const store = createStoreWithMiddleware(reducers, {
  authToken: '',
  user: {}
});

export default store;
