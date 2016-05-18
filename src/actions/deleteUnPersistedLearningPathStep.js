import { removeLearningPathStep } from '.';
import { routerActions } from 'react-router-redux';
export default function deleteUnPersistedLearningPathStep (pathId, learningPathStep) {
  return (dispatch => {
    dispatch(removeLearningPathStep(learningPathStep));
    dispatch(routerActions.push({
      pathname: `/learningpaths/${pathId}`
    }));
  });
}
