import { createAction } from 'redux-actions';

import initializeSession from './initializeSession';
import logout from './logout';
import fetchLearningPath from './fetchLearningPath';
import fetchLearningPathStep from './fetchLearningPathStep';
import fetchLearningPaths from './fetchLearningPaths';
import fetchMyLearningPaths from './fetchMyLearningPaths';
import updateLearningPath from './updateLearningPath';
import createLearningPath from './createLearningPath';
import createEmptyLearningPath from './createEmptyLearningPath';
import checkValidSession from './checkValidSession.js';
import timeoutMessage from './timeoutMessage.js';
import deleteLearningPath from './deleteLearningPath';
import fetchOembed from './fetchOembed';

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
export var removeLearningPath = createAction('REMOVE_LEARNING_PATH');
export var setUserData = createAction('SET_USER_DATA');
export var addMessage = createAction('ADD_MESSAGE');
export var clearAllMessages = createAction('CLEAR_ALL_MESSAGES');
export var clearMessage = createAction('CLEAR_MESSAGE');
export var logoutAction = createAction('LOGOUT');
export var setOembedObject = createAction('SET_OEMBED_OBJECT');

export {
  initializeSession,
  logout,
  fetchLearningPath,
  fetchLearningPathStep,
  fetchLearningPaths,
  fetchMyLearningPaths,
  updateLearningPath,
  createLearningPath,
  createEmptyLearningPath,
  timeoutMessage,
  deleteLearningPath,
  fetchOembed
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
  removeLearningPath,
  deleteLearningPath,
  setUserData,
  initializeSession,
  logout,
  fetchLearningPath,
  fetchLearningPathStep,
  fetchLearningPaths,
  fetchMyLearningPaths,
  updateLearningPath,
  createLearningPath,
  createEmptyLearningPath,
  addMessage,
  clearAllMessages,
  clearMessage,
  timeoutMessage,
  checkValidSession,
  logoutAction,
  fetchOembed
};
