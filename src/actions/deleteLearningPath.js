import { deletePath } from '../sources/learningpaths';
import { removeLearningPath } from '.';

export default function deleteLearningPath(pathId) {
  return (dispatch, getState) => deletePath(getState().authToken, { pathId })
    .then(dispatch(removeLearningPath(pathId)));
}
