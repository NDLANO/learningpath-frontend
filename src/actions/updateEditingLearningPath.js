import { setEditingLearningPath, applicationError } from '.';
import { updatePrivatePath } from '../sources/learningpaths';

export default function updateEditingLearningPath (pathId, learningPath) {
  return (dispatch, getState) => updatePrivatePath(getState().authToken, { pathId }, learningPath)
    .then(lpath => dispatch(setEditingLearningPath(lpath)))
    .catch(err => dispatch(applicationError(err)));
}
