import { setLearningPathStep, applicationError } from '.';
import { fetchPathStep } from '../sources/learningpaths';
import get from 'lodash/get';

export default function fetchLearningPathStep(pathId, stepId) {
  return (dispatch, getState) => {
    const { authToken, learningPath } = getState();

    if (get(learningPath, 'id') === pathId) {
      const step = get(learningPath, 'learningsteps', [])
        .find(s => s.id === stepId);
      if (step) {
        dispatch(setLearningPathStep(step));
      }
    }

    return fetchPathStep(authToken, {pathId, stepId})
    .then(step => dispatch(setLearningPathStep(step)))
    .catch(err => dispatch(applicationError(err)));
  };
}
