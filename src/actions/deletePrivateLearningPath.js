import { routeActions } from 'redux-simple-router';
import { deletePrivatePath } from '../sources/learningpaths';
import { removePrivateLearningPath } from '.';

export default function deletePrivateLearningPath(pathId) {
  return (dispatch, getState) => deletePrivatePath(getState().authToken, { pathId })
}