import { setLearningPath, applicationError } from '.';
import { fetchPath } from '../sources/learningpaths';

export default function fetchLearningPath (pathId) {
  (pathId)
  return (dispatch, getState) => fetchPath(getState().authToken, { pathId })
    .then(path => dispatch(setLearningPath(path)))
    .catch(err => dispatch(applicationError(err)));
}
