/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { routerActions } from 'react-router-redux';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import { applicationError, addMessage } from '../../messages/messagesActions';
import { fetchLearningPath } from '../learningPathActions';
import { updateStep, createStep, deleteStep, fetchPathStep, updateSeqNo, activateDeletedStep, fetchOembedUrl } from '../../sources/learningpaths';
import polyglot from '../../i18n';
import { oembedContentI18N } from '../../util/i18nFieldFinder';

export const setLearningPathStep = createAction('SET_LEARNING_PATH_STEP');
export const sortLearningPathSteps = createAction('SORT_LEARNING_PATH_STEPS');
export const createEmptyLearningPathStep = createAction('CREATE_EMPTY_LEARNING_PATH_STEP');
export const setOembedObject = createAction('SET_OEMBED_OBJECT');
export function fetchOembed(query) {
  return (dispatch, getState) => fetchOembedUrl(getState().authToken, query)
    .then(object => {
      const clonedObject = cloneDeep(object);
      clonedObject.url = query.url;
      dispatch(setOembedObject(clonedObject));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathStep(pathId, stepId) {
  return (dispatch, getState, locale) => {
    const { authToken, learningPath } = getState();

    if (get(learningPath, 'id') === pathId) {
      const step = get(learningPath, 'learningsteps', [])
        .find(s => s.id === stepId);
      if (step) {
        dispatch(setLearningPathStep(step));
      }
    }

    return fetchPathStep(authToken, { pathId, stepId })
    .then(step => {
      if (step.embedUrl) {
        const oembedContent = oembedContentI18N(step, locale, true);
        if (oembedContent && oembedContent.url) {
          dispatch(fetchOembed({ url: oembedContent.url, maxwidth: Math.ceil(window.innerWidth) }));
        }
      }
      dispatch(setLearningPathStep(step));
    })
    .catch(err => dispatch(applicationError(err)));
  };
}

export function updateLearningPathStep(pathId, stepId, learningPathStep) {
  return (dispatch, getState) => updateStep(getState().authToken, { pathId, stepId }, learningPathStep)
    .then((lpspath) => {
      dispatch(addMessage({ message: polyglot.t('updateLearningPath.updatedMsg') }));
      dispatch(setLearningPathStep(lpspath));
      dispatch(fetchLearningPath(pathId));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${pathId}/step/${lpspath.id}`,
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function createLearningPathStep(pathId, learningPathStep) {
  return (dispatch, getState) => createStep(getState().authToken, { pathId }, learningPathStep)
    .then(lpspath => {
      dispatch(addMessage({ message: polyglot.t('updateLearningPath.updatedMsg') }));
      dispatch(fetchLearningPath(pathId));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${pathId}/step/${lpspath.id}`,
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function activateDeletedLearningPathStep(pathId, stepId) {
  return (dispatch, getState) =>
    activateDeletedStep(getState().authToken, { pathId, stepId })
      .then(() => dispatch(fetchLearningPath(pathId)))
  ;
}

export function deleteLearningPathStep(pathId, stepId, stepTitle) {
  return (dispatch, getState) =>
    deleteStep(getState().authToken, { pathId, stepId })
      .then(() => dispatch(
        addMessage(
          {
            message: polyglot.t('learningPathStep.messages.delete.title', { stepTitle }),
            timeToLive: 7000,
            severity: 'info',
            action: {
              title: polyglot.t('learningPathStep.messages.delete.action'),
              onClick: () => dispatch(activateDeletedLearningPathStep(pathId, stepId)),
            },
          }
        )
      ))
      .then(() => dispatch(fetchLearningPath(pathId)))
  ;
}

export function updateStepSequenceNumber(pathId, stepId, seqNo) {
  return (dispatch, getState) => updateSeqNo(getState().authToken, { pathId, stepId }, { seqNo })
    .then(() => {
      dispatch(fetchLearningPath(pathId));
    })
    .catch(err => {
      dispatch(applicationError(err));
    });
}
