import { createAction } from 'redux-actions';
import { fetchPathTags } from '../../../sources/learningpaths';
import { applicationError } from '../../../actions';

const setLearningPathTags = createAction('SET_LEARNING_PATH_TAGS');

function fetchLearningPathTags() {
  return (dispatch, getState) => fetchPathTags(getState().authToken)
    .then(tags => dispatch(setLearningPathTags(tags)))
    .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathTagsIfNeeded() {
  return (dispatch, getState) => {
    const { learningPathTags } = getState();

    if (!learningPathTags.hasFetched) {
      dispatch(fetchLearningPathTags());
    }
  };
}
