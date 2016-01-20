import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { errorReporter, restoreSession } from './middleware';
import defined from 'defined';

import { getTokenSync } from './sources/session';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    restoreSession,
    errorReporter
  )(createStore);

const store = createStoreWithMiddleware(reducers, {
  authenticated: false,
  authToken: defined(getTokenSync(), ''),
  lang: 'nb',
  user: {},
  privateLearningPaths: []
});

export default store;
