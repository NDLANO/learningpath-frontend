import { setLearningPath, applicationError } from '.';
import { fetchPrivatePath } from '../sources/learningpaths';

export default function fetchPrivateLearningPath (pathId) {
  return (dispatch, getState) => fetchPrivatePath(getState().authToken, { pathId })
    .then(path => dispatch(setLearningPath(path)))
    .catch(err => dispatch(applicationError(err)));
}
