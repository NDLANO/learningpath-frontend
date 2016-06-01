import { createEmptyLearningPathStep, setLearningPath, applicationError, addMessage } from '.';
import { createPath } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';

export default function createLearningPath(learningPath) {
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
