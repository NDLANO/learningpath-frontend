import { handleActions } from 'redux-actions';
const initialState = {
  query: '',
  page: 1,
  'page-size': 16,
};
export default handleActions({
  CHANGE_IMAGE_SEARCH_QUERY: {
    next(state, action) { return Object.assign({}, state, action.payload); },
    throw(state) { return state; }
  }
}, initialState);
