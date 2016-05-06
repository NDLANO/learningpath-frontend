import { setLearningPath, applicationError, addMessage } from '.';
import { updatePath } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';

export default function updateLearningPath (pathId, learningPath, redirectUrl=`/learningpaths/${pathId}`) {
  return (dispatch, getState) => updatePath(getState().authToken, { pathId }, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: polyglot.t('updateLearningPath.updatedMsg')}));
      dispatch(setLearningPath(lpath));

      dispatch(routerActions.push({
        pathname: redirectUrl
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
