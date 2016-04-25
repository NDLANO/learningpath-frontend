import 'isomorphic-fetch';
import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';
import has from 'lodash/has';

import assureSequenceOrder from '../util/assureSequenceOrder';
import { fetchAuthorized, postAuthorized, putAuthorized, deleteAuthorized, resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const fetchPath = fetchAuthorized('/learningpaths/:pathId');
const fetchPathStep = fetchAuthorized(
    '/learningpaths/:pathId/learningsteps/:stepId');
const fetchMyPaths = fetchAuthorized('/learningpaths/mine');


const postLearningPath = postAuthorized('/learningpaths');
const postLearningPathStep = postAuthorized('/learningpaths/:pathId/learningsteps');

const createPath = (authToken, props, body) =>
  postLearningPath(authToken, props, body)
  .then(lpath => Promise.all(map(body.learningsteps, step =>
      postLearningPathStep(authToken, { pathId: lpath.id }, step )
    )).then(steps => Object.assign({}, lpath, {
      learningsteps: assureSequenceOrder(steps)
    }))
  )
;

const putLearningPath = putAuthorized('/learningpaths/:pathId');
const putLearningPathStep = putAuthorized('/learningpaths/:pathId/learningsteps/:stepId');

const updatePath = (authToken, { pathId }, body) =>
  putLearningPath(authToken, { pathId }, body);

const updateStep = (authToken, { pathId, stepId }, body) =>
  putLearningPathStep(authToken, {pathId, stepId}, body)

const createStep = (authToken, {pathId}, body) =>
  postLearningPathStep(authToken, { pathId }, body);

const deleteLearningPath = deleteAuthorized('/learningpaths/:pathId');
const deletePath = (authToken, { pathId }) =>
  deleteLearningPath(authToken, {pathId});

const putLearningPathStatus = putAuthorized('/learningpaths/:pathId/status');
const updateStatus = (authToken, { pathId }, body) =>
  putLearningPathStatus(authToken, {pathId}, body);

const learningPathsUrl = apiResourceUrl('/learningpaths');

const fetchPaths = (authToken, query) => {
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
  return fetch(url, {headers: {'APP-KEY': authToken}}).then( resolveJsonOrRejectWithError );
};

const fetchOembedUrl = fetchAuthorized('/oembed/?url=:url');

export {
  fetchPath,
  fetchPathStep,
  fetchPaths,
  createPath,
  updatePath,
  fetchMyPaths,
  deletePath,
  fetchOembedUrl,
  updateStatus,
  createStep,
  updateStep
};
