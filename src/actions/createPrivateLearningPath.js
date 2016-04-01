import { setLearningPath, applicationError, addMessage } from '.';
import { createPrivatePath } from '../sources/learningpaths';
import { routeActions } from 'redux-simple-router';

export default function createPrivateLearningPath (learningPath) {
  return (dispatch, getState) => createPrivatePath(getState().authToken, {}, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: "Lagret OK"}));
      dispatch(setLearningPath(lpath));
      dispatch(routeActions.push({
        pathname: `/learningpaths/private/${lpath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
