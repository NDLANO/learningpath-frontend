import { createEmptyLearningPathStep, setLearningPath, applicationError, addMessage } from '.';
import { copyPath } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';

export default function copyLearningPath(learningPathId) {
  return (dispatch, getState) => new Promise((resolve, reject) => copyPath(getState().authToken, {copyfrom: learningPathId})
    .then(lpath => {
      console.log('HALLA');
      dispatch(addMessage({message: polyglot.t('createLearningPath.createdMsg')}));
      dispatch(setLearningPath(lpath));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${lpath.id}`
      }));
      resolve();
    })
    .catch(err => {
      dispatch(applicationError(err));
      reject();
    }
  ));
}
