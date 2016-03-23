import { setLearningPath, applicationError } from '.';
import { updatePrivatePath } from '../sources/learningpaths';
import { routeActions } from 'redux-simple-router';

export default function updatePrivateLearningPath (pathId, learningPath) {
  return (dispatch, getState) => updatePrivatePath(getState().authToken, { pathId }, learningPath)
    .then(lpath => {
      dispatch(setLearningPath(lpath));
      dispatch(routeActions.push({
        pathname: `/learningpaths/private/${lpath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
