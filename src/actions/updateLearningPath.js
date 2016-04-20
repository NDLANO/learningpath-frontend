import { setLearningPath, applicationError, addMessage } from '.';
import { updatePath } from '../sources/learningpaths';
import { routeActions } from 'react-router-redux';
import polyglot from '../i18n';

export default function updateLearningPath (pathId, learningPath) {
  return (dispatch, getState) => updatePath(getState().authToken, { pathId }, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: polyglot.t('updateLearningPath.updatedMsg')}));
      dispatch(setLearningPath(lpath));
      dispatch(routeActions.push({
        pathname: `/learningpaths/${lpath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
