import 'isomorphic-fetch';
import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import { fetchAuthorized, putAuthorized, resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const fetchPrivatePath = fetchAuthorized('/learningpaths/private/:pathId');
const fetchPrivatePathStep = fetchAuthorized(
    '/learningpaths/private/:pathId/learningsteps/:stepId');
const fetchPrivatePaths = fetchAuthorized('/learningpaths/private');
const updatePrivatePath = putAuthorized('/learningpaths/private/:pathId');

const learningPathsUrl = apiResourceUrl('/learningpaths');

const fetchPath = pathId =>
  fetch(apiResourceUrl('/learningpaths/' + pathId))
  .then( resolveJsonOrRejectWithError );

const fetchPathStep = (pathId, stepId) =>
  fetch(apiResourceUrl('/learningpaths/' + pathId + '/learningsteps/' + stepId))
  .then( resolveJsonOrRejectWithError );

const fetchPaths = (query) => {
  let url = learningPathsUrl;
  if (query) {
    let q = cloneDeep(query);
    if (q.pageSize !== undefined) {
      q['page-size'] = q.pageSize;
      delete q.pageSize;
    }
    if (q.query === '') {
      delete q.query;
    }

    url += '?' + queryString.stringify(q);
  }
  return fetch(url).then( resolveJsonOrRejectWithError );
};

export {
  fetchPath,
  fetchPathStep,
  fetchPaths,
  fetchPrivatePath,
  updatePrivatePath,
  fetchPrivatePathStep,
  fetchPrivatePaths
};
