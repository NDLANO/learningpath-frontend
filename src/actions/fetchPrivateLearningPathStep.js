import { setLearningPathStep, applicationError } from '.';
import { fetchPrivatePathStep } from '../sources/learningpaths';
import get from 'lodash/get';

export default function fetchPrivateLearningPathStep (pathId, stepId) {
  return (dispatch, getState) => {
    let { authToken, learningPath } = getState();

    if (get(learningPath, 'id') === pathId) {
      let step = get(learningPath, 'learningsteps', [])
        .find(step => step.id === stepId);
      if (step) {
        dispatch(setLearningPathStep(step));
      }
    }

    return fetchPrivatePathStep(authToken, { pathId, stepId })
    .then(step => dispatch(setLearningPathStep(step)))
    .catch(err => dispatch(applicationError(err)));
  };
}
