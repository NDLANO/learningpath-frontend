import { updateLearningPathStepSeqNo, applicationError } from '.';
import { updateSeqNo } from '../sources/learningpaths';

export default function updateStepSequenceNumber (pathId, stepId, seqNo) {
  return (dispatch, getState) => updateSeqNo(getState().authToken, {pathId, stepId}, {'seqNo': seqNo})
    .then((object) => dispatch(updateLearningPathStepSeqNo(object)))
    .catch(err => dispatch(applicationError(err)));
}
