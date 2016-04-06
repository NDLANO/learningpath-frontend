import { deletePrivatePath } from '../sources/learningpaths';
import { removePrivateLearningPath } from '.';

export default function deletePrivateLearningPath(pathId) {
  return (dispatch, getState) => deletePrivatePath(getState().authToken, { pathId })
    .then(dispatch(removePrivateLearningPath(pathId)));
}