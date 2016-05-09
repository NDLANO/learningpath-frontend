import { fetchLearningPath } from '.';
import { deleteStep } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';

export default function deletePersistedLearningPathStep(pathId, learningPathStep) {
  return (dispatch, getState) => deleteStep(getState().authToken, {pathId: pathId, stepId: learningPathStep.id})
    .then(() => dispatch(fetchLearningPath(pathId)))
    .then(() => dispatch(routerActions.push({
      pathname: `/learningpaths/${pathId}`})));
}
