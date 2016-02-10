import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import fetchPrivateLearningPath from './fetchPrivateLearningPath';
import fetchPrivateLearningPaths from './fetchPrivateLearningPaths';
import logout from './logout';

export var applicationError = createAction('APPLICATION_ERROR');
export var setAuthenticated = createAction('SET_AUTHENTICATED');
export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setPrivateLearningPath = createAction('SET_PRIVATE_LEARNING_PATH');
export var setPrivateLearningPaths = createAction('SET_PRIVATE_LEARNING_PATHS');
export var sortPrivateLearningPaths = createAction('SORT_PRIVATE_LEARNING_PATHS');
export var setUserData = createAction('SET_USER_DATA');
export { initializeSession, fetchPrivateLearningPaths, logout };

export default {
  applicationError,
  setAuthenticated,
  setAuthToken,
  setPrivateLearningPath,
  setPrivateLearningPaths,
  sortPrivateLearningPaths,
  setUserData,
  logout,
  initializeSession,
  fetchPrivateLearningPath,
  fetchPrivateLearningPaths
};
