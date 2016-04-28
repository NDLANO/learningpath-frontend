import { sortLearningPathSteps, applicationError } from '.';
import { updateSequenceNumber } from '../sources/learningpaths';

export default function updateStepSequenceNumber (pathId, stepId, seqNo) {
  console.log(stepId)
  return (dispatch, getState) => updateSequenceNumber(getState().authToken, {pathId, stepId}, {'seqNo': seqNo})
    .then(object => dispatch(sortLearningPathSteps(object)))
    .catch(err => dispatch(applicationError(err)));
}
