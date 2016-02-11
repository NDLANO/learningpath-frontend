import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import fetchLearningPaths from './fetchLearningPaths';
import fetchPrivateLearningPath from './fetchPrivateLearningPath';
import fetchPrivateLearningPaths from './fetchPrivateLearningPaths';
import logout from './logout';

export var applicationError = createAction('APPLICATION_ERROR');
export var setAuthenticated = createAction('SET_AUTHENTICATED');
export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setLearningPaths = createAction('SET_LEARNING_PATHS');
export var changeLearningPathQuery = createAction('CHANGE_LEARNING_PATH_QUERY');
export var setPrivateLearningPath = createAction('SET_PRIVATE_LEARNING_PATH');
export var setPrivateLearningPaths = createAction('SET_PRIVATE_LEARNING_PATHS');
export var sortPrivateLearningPaths = createAction('SORT_PRIVATE_LEARNING_PATHS');
export var setUserData = createAction('SET_USER_DATA');
export { initializeSession, fetchLearningPaths, fetchPrivateLearningPath, fetchPrivateLearningPaths, logout };

export default {
  applicationError,
  setAuthenticated,
  setAuthToken,
  setLearningPaths,
  changeLearningPathQuery,
  setPrivateLearningPath,
  setPrivateLearningPaths,
  sortPrivateLearningPaths,
  setUserData,
  logout,
  initializeSession,
  fetchLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPaths
};
