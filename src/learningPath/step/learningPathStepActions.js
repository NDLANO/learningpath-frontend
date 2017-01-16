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

import { applicationError, addMessage } from '../../messages/messagesActions';
import { fetchLearningPath } from '../learningPathActions';
import { updateStep, createStep, deleteStep, fetchPathStep, updateSeqNo, activateDeletedStep, fetchOembedUrl } from '../../sources/learningpaths';
import { setOembedPreview } from './edit/validateOembedActions';
import polyglot from '../../i18n';
import { oembedContentI18N } from '../../util/i18nFieldFinder';

export const setLearningPathStep = createAction('SET_LEARNING_PATH_STEP');
export const sortLearningPathSteps = createAction('SORT_LEARNING_PATH_STEPS');
export const createEmptyLearningPathStep = createAction('CREATE_EMPTY_LEARNING_PATH_STEP');
export const setOembedObject = createAction('SET_OEMBED_OBJECT');

export function fetchOembed(query) {
  if (query.embedType === 'oembed') {
    return (dispatch, getState) => fetchOembedUrl(getState().authToken, query)
      .then((object) => {
        const clonedObject = Object.assign({}, object, { url: query.url, embedType: query.embedType, language: getState().locale });
        dispatch(setOembedObject(clonedObject));
        dispatch(setOembedPreview(clonedObject));
      })
      .catch(err => dispatch(applicationError(err)));
  }
  return ((dispatch, getState) => new Promise((resolve) => {
    const clonedObject = { html: `<iframe src="${query.url}"/>`, url: query.url, embedType: query.embedType, language: getState().locale };
    dispatch(setOembedObject(clonedObject));
    dispatch(setOembedPreview(clonedObject));
    resolve();
  }));
}

function canAccessLearningPathStep(pathId, step, isEdit = false, dispatch) {
  if (isEdit && !step.canEdit) {
    dispatch(routerActions.push({
      pathname: '/forbidden',
    }));
  }
}

export function fetchLearningPathStep(pathId, stepId, isEdit = false) {
  return (dispatch, getState) => {
    const { authToken, learningPath, locale } = getState();

    if (get(learningPath, 'id') === pathId) {
      const step = get(learningPath, 'learningsteps', []).find(s => s.id === stepId);
      if (step) {
        dispatch(setLearningPathStep(step));
        canAccessLearningPathStep(pathId, step, isEdit, dispatch);
      }
    }

    return fetchPathStep(authToken, { pathId, stepId })
      .then((step) => {
        if (step.embedUrl) {
          const oembedContent = oembedContentI18N(step, locale, true);
          if (oembedContent && oembedContent.url) {
            dispatch(fetchOembed({ url: oembedContent.url, embedType: oembedContent.embedType, maxwidth: Math.ceil(window.innerWidth) }));
          }
        }
        dispatch(setLearningPathStep(step));
        canAccessLearningPathStep(pathId, step, isEdit, dispatch);
      })
    .catch((err) => {
      if (err.status === 404) {
        dispatch(routerActions.push({ pathname: '/notfound' }));
      }
      dispatch(applicationError(err));
    });
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
    .then((lpspath) => {
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
    .catch((err) => {
      dispatch(applicationError(err));
    });
}
