import { fetchLearningPath, applicationError } from '.';
import { updateSeqNo } from '../sources/learningpaths';

export default function updateStepSequenceNumber (pathId, stepId, seqNo) {
  return (dispatch, getState) => updateSeqNo(getState().authToken, {pathId, stepId}, {'seqNo': seqNo})
    .then(() => dispatch(fetchLearningPath(pathId)))
    .catch(err => dispatch(applicationError(err)));
}
