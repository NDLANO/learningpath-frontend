import { setEditingLearningPath, applicationError } from '.';
import { updatePrivatePath } from '../sources/learningpaths';
import { routeActions } from 'redux-simple-router';

export default function updateEditingLearningPath (pathId, learningPath) {
  return (dispatch, getState) => updatePrivatePath(getState().authToken, { pathId }, learningPath)
    .then(lpath => {
      //console.log('updatePrivatePath: sent %o', learningPath);
      //console.log('updatePrivatePath: got %o', lpath);
      dispatch(setEditingLearningPath(lpath));
      dispatch(routeActions.push({
        pathname: `/learningpaths/private/${lpath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
