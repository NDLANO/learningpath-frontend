import { fetchLearningPath } from '.';
import { deleteStep } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';

export default function deletePersistedLearningPathStep(pathIde, learningPathStep) {
  return (dispatch, getState) => deleteStep(getState().authToken, {pathId: pathIde, stepId: learningPathStep.id})
    .then(() => dispatch(fetchLearningPath(pathIde)))
    .then(() => dispatch(routerActions.push({
      pathname: `/learningpaths/${pathIde}`})));
}
