import { setLearningPath, applicationError } from '.';
import { fetchPath } from '../sources/learningpaths';

export default function fetchLearningPath (pathId) {
  return dispatch => fetchPath(pathId)
    .then(path => dispatch(setLearningPath(path)))
    .catch(err => dispatch(applicationError(err)));
}
