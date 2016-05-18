import { setLearningPathStep, applicationError, addMessage, fetchLearningPath } from '.';
import { updateStep } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';

export default function updateLearningPathStep (pathId, stepId, learningPathStep) {
  return (dispatch, getState) => updateStep(getState().authToken, { pathId, stepId }, learningPathStep)
    .then( (lpspath) => {
      dispatch(addMessage({message: polyglot.t('updateLearningPath.updatedMsg')}));
      dispatch(setLearningPathStep(lpspath));
      dispatch(fetchLearningPath(pathId));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${pathId}/step/${lpspath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
