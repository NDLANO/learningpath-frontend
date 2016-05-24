import { fetchLearningPath } from '.';
import { deleteStep } from '../sources/learningpaths';

export function deleteLearningPathStep(pathId, learningPathStepId) {
  return (dispatch, getState) =>
    deleteStep(getState().authToken, {pathId, stepId: learningPathStepId})
      .then(() => dispatch(fetchLearningPath(pathId)))
  ;
}
