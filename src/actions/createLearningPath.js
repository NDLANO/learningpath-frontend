import { setLearningPath, applicationError, addMessage } from '.';
import { createPath } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';

export default function createLearningPath (learningPath) {
  return (dispatch, getState) => createPath(getState().authToken, {}, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: polyglot.t('createLearningPath.createdMsg')}));
      dispatch(setLearningPath(lpath));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${lpath.id}/edit`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
