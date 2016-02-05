import { setPrivateLearningPath, applicationError } from '.';
import { fetchPrivatePath } from '../sources/learningpaths';

export default function fetchPrivateLearningPath (pathId) {
  return (dispatch, getState) => fetchPrivatePath(getState().authToken, { pathId })
    .then(path => dispatch(setPrivateLearningPath(path)))
    .catch(err => dispatch(applicationError(err)));
}
