/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { routerActions } from 'react-router-redux';

import { fetchPath, createPath, deletePath, updatePath, copyPath, updateStatus, activateDeletedPath } from '../sources/learningpaths';
import { applicationError, addMessage } from '../messages/messagesActions';
import { createEmptyLearningPathStep } from './step/learningPathStepActions';
import polyglot from '../i18n';
import { titleI18N } from '../util/i18nFieldFinder';
import { fetchLearningPathImageWithMetaUrl, setSelectedImage, setSavedImage } from '../imageSearch/imageActions';

export const setLearningPath = createAction('SET_LEARNING_PATH');
export const setLearningPathStatus = createAction('UPDATE_LEARNING_PATH_STATUS');
export const removeLearningPath = createAction('REMOVE_LEARNING_PATH');

export function fetchLearningPath(pathId) {
  return (dispatch, getState) => fetchPath(getState().authToken, { pathId })
    .then(path => dispatch(setLearningPath(path)))
    .then(path => {
      if (path.payload.coverPhoto) {
        dispatch(fetchLearningPathImageWithMetaUrl(path.payload.coverPhoto.metaUrl));
      } else {
        dispatch(setSavedImage({}));
        dispatch(setSelectedImage({}));
      }
    })
    .catch(err => dispatch(applicationError(err)));
}

export function createEmptyLearningPath() {
  return setLearningPath({
    title: [],
    description: [],
    learningsteps: [],
    duration: 1, // https://support.knowit.no/support/browse/NDLA-198
    coverPhotoMetaUrl: '',
  });
}

export function createLearningPath(learningPath) {
  return (dispatch, getState) => new Promise((resolve, reject) => createPath(getState().authToken, { }, learningPath)
    .then(lpath => {
      dispatch(addMessage({ message: polyglot.t('createLearningPath.createdMsg') }));
      dispatch(setLearningPath(lpath));
      dispatch(createEmptyLearningPathStep());
      dispatch(routerActions.push({
        pathname: `/learningpaths/${lpath.id}/step/new`,
      }));
      resolve();
    })
    .catch(err => {
      dispatch(applicationError(err));
      reject();
    }
  ));
}

export function updateLearningPath(pathId, learningPath, redirectUrl = `/learningpaths/${pathId}`) {
  return (dispatch, getState) => new Promise((resolve, reject) => updatePath(getState().authToken, { pathId }, learningPath)
    .then(lpath => {
      dispatch(addMessage({ message: polyglot.t('updateLearningPath.updatedMsg') }));
      dispatch(setLearningPath(lpath));
      dispatch(routerActions.push({
        pathname: redirectUrl,
      }));
      resolve();
    })
    .catch(err => {
      dispatch(applicationError(err));
      reject();
    }
  ));
}
export function activateDeletedLearningPath(pathId) {
  return (dispatch, getState) =>
    activateDeletedPath(getState().authToken, { pathId });
}
export function deleteLearningPath(pathId) {
  return (dispatch, getState) => deletePath(getState().authToken, { pathId })
    .then(dispatch(removeLearningPath(pathId)))
    .then(dispatch(
      addMessage(
        {
          message: 'Angre sletting?',
          timeToLive: 7000,
          severity: 'info',
          action: {
            title: polyglot.t('learningPathStep.messages.delete.action'),
            onClick: () => dispatch(activateDeletedLearningPath(pathId)),
          },
        }
      ))
    );
}

export function updateLearningPathStatus(pathId, status, redirectUrl = false) {
  return (dispatch, getState) => updateStatus(getState().authToken, { pathId }, { status })
    .then(() => {
      dispatch(setLearningPathStatus({ id: pathId, status }));
      dispatch(addMessage({ message: polyglot.t('updateLearningPathStatus.updateStatusMsg') }));
      if (redirectUrl) {
        dispatch(routerActions.push({
          pathname: redirectUrl,
        }));
      }
    })
    .catch(err => dispatch(applicationError(err)));
}

export function copyLearningPath(learningPath, locale) {
  const copiedTitle = polyglot.t('copyLearningPath.copy').concat(titleI18N(learningPath, locale, true).toString());
  const clonedLearningPathTitle = {
    title: [
      { title: copiedTitle, language: locale },
    ],
  };

  return (dispatch, getState) => new Promise((resolve, reject) => copyPath(getState().authToken, { copyfrom: learningPath.id }, clonedLearningPathTitle)
    .then(lpath => {
      dispatch(addMessage({ message: polyglot.t('copyLearningPath.copiedMessage') }));
      dispatch(setLearningPath(lpath));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${lpath.id}`,
      }));
      resolve();
    })
    .catch(err => {
      dispatch(applicationError(err));
      reject();
    }
  ));
}
