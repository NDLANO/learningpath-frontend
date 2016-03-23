import { setLearningPaths, applicationError } from '.';
import { fetchPrivatePaths } from '../sources/learningpaths';

export default function fetchPrivateLearningPaths () {
  return (dispatch, getState) => fetchPrivatePaths( getState().authToken )
    .then(paths => dispatch(setLearningPaths(paths)))
    .catch(err => dispatch(applicationError(err)));
}
