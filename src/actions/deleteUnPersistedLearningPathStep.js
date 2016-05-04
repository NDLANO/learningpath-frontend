import { setLearningPath, applicationError, addMessage, removeLearningPathStep, fetchLearningPath } from '.';
import { routerActions } from 'react-router-redux';
export default function deleteUnPersistedLearningPathStep (pathId, learningPathStep) {
  return ((dispatch, getState) => {
    dispatch(removeLearningPathStep(learningPathStep))
    dispatch(routerActions.push({
      pathname: `/learningpaths/${pathId}`
    }))
  });
}
