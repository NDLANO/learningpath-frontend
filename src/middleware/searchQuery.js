import isEmpty from 'lodash/isEmpty';
import actions from '../actions';

const defaultSearchQuery = {
  page: 1,
  pageSize: 10,
  sort: '-lastUpdated',
  query: '',
  tag: '',
};

const parseSearchQuery = (query) => Object.keys(query).reduce((obj, key) => {
  const copy = Object.assign({}, obj);
  switch (key) {
    case 'page':
    case 'pageSize':
      copy[key] = parseInt(query[key], 10);
      break;
    default:
      copy[key] = query[key];
  }
  return copy;
}, {});


const searchQueryMiddleware = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE' && action.payload.pathname.endsWith('learningpaths')) {
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
