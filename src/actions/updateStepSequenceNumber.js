import { fetchLearningPath, applicationError } from '.';
import { push } from 'react-router-redux';
import { updateSeqNo } from '../sources/learningpaths';

export default function updateStepSequenceNumber (pathId, steps) {
  return (dispatch, getState) => {
    updateSeqNo(getState().authToken, { pathId }, steps)
      .then(() => {
        dispatch(fetchLearningPath(pathId));
        push(`/learningpaths/${pathId}`);
      })
      .catch(err => {
        dispatch(applicationError(err));
      });
  };
}
