import { setLearningPathStatus, applicationError, addMessage } from '.';
import { updateStatus } from '../sources/learningpaths';
import { routerActions } from 'react-router-redux';
import polyglot from '../i18n';

export default function updateLearningPathStatus (pathId, status, redirectUrl='') {
  return (dispatch, getState) => updateStatus(getState().authToken, { pathId }, {'status': status})
    .then(() => {
      dispatch(setLearningPathStatus({id: pathId, status: status}));
      dispatch(addMessage({message: polyglot.t('updateLearningPathStatus.updateStatusMsg')}));
      if (redirectUrl) {
        dispatch(routerActions.push({
          pathname: redirectUrl
        }));
      }
    })
    .catch(err => dispatch(applicationError(err)));
}
