import { createAction } from 'redux-actions';
import { fetchPathLicenses } from '../../../sources/learningpaths';
import { applicationError } from '../../../actions';

const setLearningPathLicensens = createAction('SET_LEARNING_PATH_LICENSES');

function fetchLearningPathLicenses() {
  return (dispatch, getState) => fetchPathLicenses(getState().authToken)
    .then(licenses => dispatch(setLearningPathLicensens(licenses)))
    .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathLicensesIfNeeded() {
  return (dispatch, getState) => {
    const { learningPathLicenses } = getState();

    if (!learningPathLicenses.hasFetched) {
      dispatch(fetchLearningPathLicenses());
    }
  };
}
