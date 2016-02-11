import { setPrivateLearningPathStep, applicationError } from '.';
import { fetchPrivatePathStep } from '../sources/learningpaths';
import get from 'lodash/get';

export default function fetchPrivateLearningPathStep (pathId, stepId) {
  return (dispatch, getState) => {
    let { authToken, privateLearningPath } = getState();

    if (get(privateLearningPath, 'id') === pathId) {
      let step = get(privateLearningPath, 'learningsteps', [])
        .find(step => step.id === stepId);
      if (step) {
        dispatch(setPrivateLearningPathStep(step));
      }
    }

    fetchPrivatePathStep(authToken, { pathId, stepId })
    .then(step => dispatch(setPrivateLearningPathStep(step)))
    .catch(err => dispatch(applicationError(err)));
  };
}
