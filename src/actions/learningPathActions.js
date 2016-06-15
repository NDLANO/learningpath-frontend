import { createEmptyLearningPathStep, setLearningPath, applicationError, addMessage, removeLearningPath } from '.';
import { fetchPath, createPath, deletePath, updatePath } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';

export function fetchLearningPath(pathId) {
  return (dispatch, getState) => fetchPath(getState().authToken, { pathId })
    .then(path => dispatch(setLearningPath(path)))
    .catch(err => dispatch(applicationError(err)));
}

export function createEmptyLearningPath() {
  return setLearningPath({
    title: [],
    description: [],
    learningsteps: [],
    duration: 1 // https://support.knowit.no/support/browse/NDLA-198
  });
}

export function createLearningPath(learningPath) {
  return (dispatch, getState) => new Promise((resolve, reject) => createPath(getState().authToken, { }, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: polyglot.t('createLearningPath.createdMsg')}));
      dispatch(setLearningPath(lpath));
      dispatch(createEmptyLearningPathStep());
      dispatch(routerActions.push({
        pathname: `/learningpaths/${lpath.id}/step/new`
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
  console.log(learningPath);
  return (dispatch, getState) => new Promise((resolve, reject) => updatePath(getState().authToken, { pathId }, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: polyglot.t('updateLearningPath.updatedMsg')}));
      dispatch(setLearningPath(lpath));
      dispatch(routerActions.push({
        pathname: redirectUrl
      }));
      resolve();
    })
    .catch(err => {
      dispatch(applicationError(err));
      reject();
    }
  ));
}

export function deleteLearningPath(pathId) {
  return (dispatch, getState) => deletePath(getState().authToken, { pathId })
    .then(dispatch(removeLearningPath(pathId)));
}
