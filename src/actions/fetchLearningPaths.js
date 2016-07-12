import { setLearningPathsTotalCount, setLearningPaths } from '.';
import { applicationError } from '../messages/messagesActions';
import { fetchPaths } from '../sources/learningpaths';

export default function fetchLearningPaths(query) {
  return (dispatch, getState) => fetchPaths(getState().authToken, query)
    .then(res => {
      dispatch(setLearningPathsTotalCount(res.totalCount));
      dispatch(setLearningPaths(res.results));
    })
    .catch(err => dispatch(applicationError(err)));
}
