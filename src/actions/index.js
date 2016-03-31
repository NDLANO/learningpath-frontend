import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import logout from './logout';
import fetchLearningPath from './fetchLearningPath';
import fetchLearningPathStep from './fetchLearningPathStep';
import fetchLearningPaths from './fetchLearningPaths';
import fetchPrivateLearningPath from './fetchPrivateLearningPath';
import fetchPrivateLearningPathStep from './fetchPrivateLearningPathStep';
import fetchPrivateLearningPaths from './fetchPrivateLearningPaths';
import updatePrivateLearningPath from './updatePrivateLearningPath';
import createPrivateLearningPath from './createPrivateLearningPath';
import createEmptyLearningPath from './createEmptyLearningPath';
import checkValidSession from './checkValidSession.js';
import deletePrivateLearningPath from './deletePrivateLearningPath';

export var applicationError = createAction('APPLICATION_ERROR');
export var setAuthenticated = createAction('SET_AUTHENTICATED');
export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setLearningPath = createAction('SET_LEARNING_PATH');
export var setLearningPathStep = createAction('SET_LEARNING_PATH_STEP');
export var setLearningPaths = createAction('SET_LEARNING_PATHS');
export var changeLearningPathQuery = createAction('CHANGE_LEARNING_PATH_QUERY');
export var setLearningPathsTotalCount = createAction('SET_LEARNING_PATHS_TOTAL_COUNT');
export var sortPrivateLearningPaths = createAction('SORT_PRIVATE_LEARNING_PATHS');
export var createLearningPathStep = createAction('CREATE_LEARNING_PATH_STEP');
export var updateLearningPathStep = createAction('UPDATE_LEARNING_PATH_STEP');
export var updateLearningPathTitle = createAction('UPDATE_LEARNING_PATH_TITLE');
export var updateLearningPathDescription = createAction('UPDATE_LEARNING_PATH_DESCRIPTION');
export var setUserData = createAction('SET_USER_DATA');
export var addMessage = createAction('ADD_MESSAGE');
export var clearMessages = createAction('CLEAR_MESSAGES');
export var logoutAction = createAction('LOGOUT');

export {
  initializeSession,
  logout,
  fetchLearningPath,
  fetchLearningPathStep,
  fetchLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPathStep,
  fetchPrivateLearningPaths,
  updatePrivateLearningPath,
  createPrivateLearningPath,
  createEmptyLearningPath,
  deletePrivateLearningPath
};

export default {
  applicationError,
  setAuthenticated,
  setAuthToken,
  setLearningPath,
  setLearningPathStep,
  setLearningPaths,
  changeLearningPathQuery,
  setLearningPathsTotalCount, 
  sortPrivateLearningPaths,
  createLearningPathStep,
  updateLearningPathStep,
  updateLearningPathTitle,
  updateLearningPathDescription,
  deletePrivateLearningPath,
  setUserData,
  initializeSession,
  logout,
  fetchLearningPath,
  fetchLearningPathStep,
  fetchLearningPaths,
  fetchPrivateLearningPath,
  fetchPrivateLearningPathStep,
  fetchPrivateLearningPaths,
  updatePrivateLearningPath,
  createPrivateLearningPath,
  createEmptyLearningPath,
  addMessage,
  clearMessages,
  checkValidSession,
  logoutAction
};
