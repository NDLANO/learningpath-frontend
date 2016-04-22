import { setLearningPathStep, applicationError } from '.';
import { fetchPathStep } from '../sources/learningpaths';
import get from 'lodash/get';
import {createLearningPathStep} from './';

export default function fetchLearningPathStep (pathId, stepId) {
  return (dispatch, getState) => {
    let { authToken, learningPath } = getState();

    if (get(learningPath, 'id') === pathId) {
      let step = get(learningPath, 'learningsteps', [])
        .find(step => step.id === stepId);
      if (step) {
        dispatch(setLearningPathStep(step));
      }
    }

    return fetchPathStep(authToken, {pathId, stepId})
    .then(step => dispatch(setLearningPathStep(step)))
    .catch(err => dispatch(applicationError(err)));
  };
}
