import { setLearningPathsTotalCount, setLearningPaths, changeLearningPathQuery, applicationError } from '.';
import { fetchPaths } from '../sources/learningpaths';

export default function fetchLearningPaths () {
  return (dispatch, getState) => fetchPaths(getState().learningPathQuery)
    .then(res => {
      dispatch(setLearningPathsTotalCount(res.totalCount));
      dispatch(setLearningPaths(res.results));
      dispatch(changeLearningPathQuery({
        page: res.page,
        pageSize: res.pageSize
      }));
    })
    .catch(err => dispatch(applicationError(err)));
}
