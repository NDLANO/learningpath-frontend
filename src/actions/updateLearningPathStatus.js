import { setLearningPathStatus, applicationError } from '.';
import { updateStatus } from '../sources/learningpaths';
import { routeActions } from 'redux-simple-router';

export default function updateLearningPathStatus (pathId, status) {
  return (dispatch, getState) => updateStatus(getState().authToken, { pathId }, {'status': status})
    .then(() => dispatch(setLearningPathStatus({id: pathId, status: status})))
    .catch(err => dispatch(applicationError(err)));
}
