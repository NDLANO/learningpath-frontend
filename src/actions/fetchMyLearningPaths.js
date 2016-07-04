import { setLearningPaths } from '.';
import { applicationError } from '../messages/messagesActions';
import { fetchMyPaths } from '../sources/learningpaths';

export default function fetchMyLearningPaths() {
  return (dispatch, getState) => fetchMyPaths(getState().authToken)
    .then(paths => dispatch(setLearningPaths(paths)))
    .catch(err => dispatch(applicationError(err)));
}
