import { setLearningPath, applicationError, addMessage } from '.';
import { updatePath } from '../sources/learningpaths';
import { routeActions } from 'redux-simple-router';

export default function updateLearningPath (pathId, learningPath) {
  return (dispatch, getState) => updatePath(getState().authToken, { pathId }, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: 'Lagret OK'}));
      dispatch(setLearningPath(lpath));
      dispatch(routeActions.push({
        pathname: `/learningpaths/${lpath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
