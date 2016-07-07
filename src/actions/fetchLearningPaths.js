import { setLearningPathsTotalCount, setLearningPaths, changeLearningPathQuery } from '.';
import { applicationError } from '../messages/messagesActions';
import { fetchPaths } from '../sources/learningpaths';

export default function fetchLearningPaths() {
  return (dispatch, getState) => fetchPaths(getState().authToken, getState().learningPathQuery)
    .then(res => {
      dispatch(setLearningPathsTotalCount(res.totalCount));
      dispatch(setLearningPaths(res.results));
      dispatch(changeLearningPathQuery({
        page: res.page,
        pageSize: res.pageSize,
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
