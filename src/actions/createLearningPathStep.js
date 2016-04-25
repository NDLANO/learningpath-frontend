import { setLearningPathStep, applicationError, addMessage, fetchLearningPath } from '.';
import { createStep, updateStep } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';

export default function createLearningPathStep (pathId, learningPathStep) {
  return (dispatch, getState) => createStep(getState().authToken, { pathId }, learningPathStep)
    .then( lpspath => {
      dispatch(addMessage({message: polyglot.t('updateLearningPath.updatedMsg')}));
      dispatch(fetchLearningPath(pathId));
      dispatch(routerActions.push({
        pathname: `/learningpaths/${pathId}/step/${lpspath.id}`
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
