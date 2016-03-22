import isEmpty from 'lodash/isEmpty';
import actions from '../actions';

const defaultSearchQuery = {
  page: 1,
  pageSize: 10,
  sort: '-lastUpdated',
  query: ''
};

const parseSearchQuery = (query) => Object.keys(query).reduce((obj, key) => {
  switch (key) {
  case 'page':
  case 'pageSize':
    obj[key] = parseInt(query[key]);
    break;
  default:
    obj[key] = query[key];
  }
  return obj;
}, {});


const searchQueryMiddleware = store => next => action => {
  if (action.type === '@@router/UPDATE_LOCATION' && action.payload.pathname === '/learningpaths') {
    let query = parseSearchQuery(action.payload.query);
    if (isEmpty(query)) {
      query = defaultSearchQuery;
    }
    store.dispatch(actions.changeLearningPathQuery(query));
  }
  return next(action);
};

export { parseSearchQuery, defaultSearchQuery };
export default searchQueryMiddleware;
