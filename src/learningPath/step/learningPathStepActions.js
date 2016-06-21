import { createAction } from 'redux-actions';
import { applicationError, addMessage } from '../../actions';
import { fetchLearningPath } from '../learningPathActions';
import { updateStep, createStep, deleteStep, fetchPathStep, updateSeqNo } from '../../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../../i18n';
import get from 'lodash/get';

export const setLearningPathStep = createAction('SET_LEARNING_PATH_STEP');
export const sortLearningPathSteps = createAction('SORT_LEARNING_PATH_STEPS');
export const createEmptyLearningPathStep = createAction('CREATE_EMPTY_LEARNING_PATH_STEP');

export function fetchLearningPathStep(pathId, stepId) {
  return (dispatch, getState) => {
    const { authToken, learningPath } = getState();

    if (get(learningPath, 'id') === pathId) {
      const step = get(learningPath, 'learningsteps', [])
        .find(s => s.id === stepId);
      if (step) {
        dispatch(setLearningPathStep(step));
      }
    }

    return fetchPathStep(authToken, {pathId, stepId})
    .then(step => dispatch(setLearningPathStep(step)))
    .catch(err => dispatch(applicationError(err)));
  };
}

export function updateLearningPathStep(pathId, stepId, learningPathStep) {
  return (dispatch, getState) => updateStep(getState().authToken, { pathId, stepId }, learningPathStep)
    .then((lpspath) => {
      dispatch(addMessage({message: polyglot.t('updateLearningPath.updatedMsg')}));
      dispatch(setLearningPathStep(lpspath));
      dispatch(fetchLearningPath(pathId));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${pathId}/step/${lpspath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function createLearningPathStep(pathId, learningPathStep) {
  return (dispatch, getState) => createStep(getState().authToken, { pathId }, learningPathStep)
    .then(lpspath => {
      dispatch(addMessage({message: polyglot.t('updateLearningPath.updatedMsg')}));
      dispatch(fetchLearningPath(pathId));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${pathId}/step/${lpspath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function deleteLearningPathStep(pathId, learningPathStepId) {
  return (dispatch, getState) =>
    deleteStep(getState().authToken, {pathId, stepId: learningPathStepId})
      .then(() => dispatch(fetchLearningPath(pathId)))
  ;
}

export function updateStepSequenceNumber(pathId, stepId, seqNo) {
  return (dispatch, getState) => updateSeqNo(getState().authToken, {pathId, stepId}, {seqNo})
    .then(() => {
      dispatch(fetchLearningPath(pathId));
    })
    .catch(err => {
      dispatch(applicationError(err));
    });
}
