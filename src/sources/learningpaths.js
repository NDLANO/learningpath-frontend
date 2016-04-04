import 'isomorphic-fetch';
import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';
import has from 'lodash/has';

import assureSequenceOrder from '../util/assureSequenceOrder';
import { fetchAuthorized, postAuthorized, putAuthorized, resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const fetchPrivatePath = fetchAuthorized('/learningpaths/private/:pathId');
const fetchPrivatePathStep = fetchAuthorized(
    '/learningpaths/private/:pathId/learningsteps/:stepId');
const fetchPrivatePaths = fetchAuthorized('/learningpaths/private');


const postLearningPath = postAuthorized('/learningpaths');
const postLearningPathStep = postAuthorized('/learningpaths/:pathId/learningsteps');

const createPrivatePath = (authToken, props, body) =>
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

const updatePrivatePath = (authToken, { pathId }, body) =>
  putLearningPath(authToken, { pathId }, body)
  .then(lpath => Promise.all(map(body.learningsteps, step =>
      has(step, 'id') ?
        putLearningPathStep(authToken, { pathId, stepId: step.id }, step ) :
        postLearningPathStep(authToken, { pathId }, step )
    )).then(steps => Object.assign({}, lpath, {
      learningsteps: assureSequenceOrder(steps)
    }))
  )
;

const putLearningPathStatus = putAuthorized('/learningpaths/:pathId/status');

const updateLearningPathStatus = (authToken, { pathId }, body) =>
  putLearningPathStatus(authToken, {pathId}, body);

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
  createPrivatePath,
  updatePrivatePath,
  updateLearningPathStatus,
  fetchPrivatePathStep,
  fetchPrivatePaths
};
