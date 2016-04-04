import { setLearningPath, applicationError } from '.';
import { updateLearningPathStatus } from '../sources/learningpaths';
import { routeActions } from 'redux-simple-router';

export default function updatePrivateLearningPathStatus (pathId, status) {
  return (dispatch, getState) => updateLearningPathStatus(getState().authToken, { pathId }, {'status': status})
    .catch(err => dispatch(applicationError(err)));
}
