import { setLearningPath, applicationError, addMessage } from '.';
import { createPath } from '../sources/learningpaths';
import { routeActions } from 'redux-simple-router';

export default function createLearningPath (learningPath) {
  return (dispatch, getState) => createPath(getState().authToken, {}, learningPath)
    .then(lpath => {
      dispatch(addMessage({message: 'Lagret OK'}));
      dispatch(setLearningPath(lpath));
      dispatch(routeActions.push({
        pathname: `/learningpaths/${lpath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
