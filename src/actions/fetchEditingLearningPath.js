import { setEditingLearningPath, applicationError } from '.';
import { fetchPrivatePath } from '../sources/learningpaths';

export default function fetchEditingLearningPath (pathId) {
  return (dispatch, getState) => fetchPrivatePath(getState().authToken, { pathId })
    .then(path => dispatch(setEditingLearningPath(path)))
    .catch(err => dispatch(applicationError(err)));
}

