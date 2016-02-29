import { setEditingLearningPath, applicationError } from '.';
import { createPrivatePath } from '../sources/learningpaths';

export default function createEditingLearningPath (learningPath) {
  return (dispatch, getState) => createPrivatePath(getState().authToken, learningPath)
    .then(lpath => dispatch(setEditingLearningPath(lpath)))
    .catch(err => dispatch(applicationError(err)));
}
