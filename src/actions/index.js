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
import validateOembed from './validateOembed';
import updateLearningPathStatus from './updateLearningPath';
import updateLearningPathStep from './updateLearningPathStep';
import createLearningPathStep from './createLearningPathStep';
import updateStepSequenceNumber from './updateStepSequenceNumber';

export var applicationError = createAction('APPLICATION_ERROR');
export var setAuthenticated = createAction('SET_AUTHENTICATED');
export var setAuthToken = createAction('SET_AUTH_TOKEN');
export var setLearningPath = createAction('SET_LEARNING_PATH');
export var setLearningPathStep = createAction('SET_LEARNING_PATH_STEP');
export var setLearningPaths = createAction('SET_LEARNING_PATHS');
export var changeLearningPathQuery = createAction('CHANGE_LEARNING_PATH_QUERY');
export var setLearningPathsTotalCount = createAction('SET_LEARNING_PATHS_TOTAL_COUNT');
export var sortPrivateLearningPaths = createAction('SORT_PRIVATE_LEARNING_PATHS');
export var updateLearningPathTitle = createAction('UPDATE_LEARNING_PATH_TITLE');
export var updateLearningPathDescription = createAction('UPDATE_LEARNING_PATH_DESCRIPTION');
export var removeLearningPath = createAction('REMOVE_LEARNING_PATH');
export var setUserData = createAction('SET_USER_DATA');
export var addMessage = createAction('ADD_MESSAGE');
export var clearAllMessages = createAction('CLEAR_ALL_MESSAGES');
export var clearMessage = createAction('CLEAR_MESSAGE');
export var logoutAction = createAction('LOGOUT');
export var setOembedObject = createAction('SET_OEMBED_OBJECT');
export var setLearningPathStatus = createAction('UPDATE_LEARNING_PATH_STATUS');
export var updateLearningPathStepDescription = createAction('UPDATE_LEARNING_PATH_STEP_DESCRIPTION');
export var updateLearningPathStepTitle = createAction('UPDATE_LEARNING_PATH_STEP_TITLE');
export var updateLearningPathStepEmbedUrl = createAction('UPDATE_LEARNING_PATH_STEP_EMBED_URL');
export var updateLearningPathStepType= createAction('UPDATE_LEARNING_PATH_STEP_TYPE');
export var doStuff = createAction('DO_STUFF');
export var createEmptyLearningPathStep = createAction('CREATE_EMPTY_LEARNING_PATH_STEP');
export var setIsValidOembed = createAction('SET_IS_VALID_OEMBED');
export var removeLearningPathStepEmbedContent = createAction('REMOVE_LEARNING_PATH_STEP_EMBED_CONTENT');
export var sortLearningPathSteps = createAction('SORT_LEARNING_PATH_STEPS');
export var updateLearningPathStepSeqNo = createAction('UPDATE_LEARNING_PATH_STEP_SEQ_NO');
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
  fetchOembed,
  validateOembed,
  updateLearningPathStatus,
  updateLearningPathStep,
  createLearningPathStep,
  updateStepSequenceNumber

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
  fetchOembed,
  validateOembed,
  setLearningPathStatus,
  createEmptyLearningPathStep,
  updateLearningPathStepDescription,
  updateLearningPathStepTitle,
  updateLearningPathStepEmbedUrl,
  updateLearningPathStepType,
  setIsValidOembed,
  removeLearningPathStepEmbedContent,
  sortLearningPathSteps,
  updateStepSequenceNumber,
  updateLearningPathStepSeqNo,
  doStuff
};
