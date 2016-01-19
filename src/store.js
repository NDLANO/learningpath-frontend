import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { errorReporter, restoreSession } from './middleware';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    restoreSession,
    errorReporter
  )(createStore);

const store = createStoreWithMiddleware(reducers, {
  authenticated: false,
  authToken: '',
  lang: 'nb',
  user: {}
});

export default store;
