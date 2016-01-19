import { setPrivateLearningPaths, applicationError } from '.';
import { fetchPrivatePaths } from '../sources/paths';

export default function fetchPrivateLearningPaths () {
  return (dispatch, getState) => fetchPrivatePaths( getState().authToken )
    .then(paths => dispatch(setPrivateLearningPaths(paths)))
    .catch(err => dispatch(applicationError(err)));
}
