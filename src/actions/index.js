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
import updateLearningPathStatus from './updateLearningPathStatus';
import updateLearningPathStep from './updateLearningPathStep';
import createLearningPathStep from './createLearningPathStep';
import { deleteLearningPathStep } from './deleteLearningPathStep';
import updateStepSequenceNumber from './updateStepSequenceNumber';

export const applicationError = createAction('APPLICATION_ERROR');
export const setAuthenticated = createAction('SET_AUTHENTICATED');
export const setAuthToken = createAction('SET_AUTH_TOKEN');
export const setLearningPath = createAction('SET_LEARNING_PATH');
export const setLearningPathStep = createAction('SET_LEARNING_PATH_STEP');
export const setLearningPaths = createAction('SET_LEARNING_PATHS');
export const changeLearningPathQuery = createAction('CHANGE_LEARNING_PATH_QUERY');
export const setLearningPathsTotalCount = createAction('SET_LEARNING_PATHS_TOTAL_COUNT');
export const setMyLearningPathsSortOrder = createAction('SET_MY_LEARNING_PATHS_SORT_ORDER');
export const updateLearningPathTitle = createAction('UPDATE_LEARNING_PATH_TITLE');
export const updateLearningPathDescription = createAction('UPDATE_LEARNING_PATH_DESCRIPTION');
export const removeLearningPath = createAction('REMOVE_LEARNING_PATH');
export const setUserData = createAction('SET_USER_DATA');
export const addMessage = createAction('ADD_MESSAGE');
export const clearAllMessages = createAction('CLEAR_ALL_MESSAGES');
export const clearMessage = createAction('CLEAR_MESSAGE');
export const logoutAction = createAction('LOGOUT');
export const setOembedObject = createAction('SET_OEMBED_OBJECT');
export const setLearningPathStatus = createAction('UPDATE_LEARNING_PATH_STATUS');
export const createEmptyLearningPathStep = createAction('CREATE_EMPTY_LEARNING_PATH_STEP');
export const sortLearningPathSteps = createAction('SORT_LEARNING_PATH_STEPS');
export const closeSidebars = createAction('CLOSE_SIDEBARS');
export const openLeftSidebar = createAction('OPEN_LEFT_SIDEBAR');
export const openRightSidebar = createAction('OPEN_RIGHT_SIDEBAR');

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
  deleteLearningPathStep,
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
  setMyLearningPathsSortOrder,
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
  deleteLearningPathStep,
  sortLearningPathSteps,
  updateStepSequenceNumber,
  closeSidebars,
  openLeftSidebar,
  openRightSidebar,
};
