import { setLearningPath, applicationError, addMessage } from '.';
import { createPath } from '../sources/learningpaths';
import { routeActions } from 'redux-simple-router';
import polyglot from '../i18n';

export default function createLearningPath (learningPath) {
  return (dispatch, getState) => createPath(getState().authToken, {}, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: polyglot.t('createLearningPath.createdMsg')}));
      dispatch(setLearningPath(lpath));
      dispatch(routeActions.push({
        pathname: `/learningpaths/${lpath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
