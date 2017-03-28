/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';

import assureSequenceOrder from '../util/assureSequenceOrder';
import { fetchAuthorized, authorizationHeader, postAuthorized, putAuthorized, patchAuthorized, deleteAuthorized, resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const fetchPath = fetchAuthorized('/learningpath-api/v1/learningpaths/:pathId');
const fetchPathStep = fetchAuthorized(
    '/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId');
const fetchMyPaths = fetchAuthorized('/learningpath-api/v1/learningpaths/mine');
const fetchPathTags = fetchAuthorized('/learningpath-api/v1/learningpaths/tags');
const fetchPathLicenses = (accessToken, filter) => {
  let url = apiResourceUrl('/learningpath-api/v1/learningpaths/licenses');
  if (filter.length > 0) {
    const query = { filter };
    url += `?${queryString.stringify(query)}`;
  }
  return fetch(url, { headers: { Authorization: authorizationHeader(accessToken) } }).then(resolveJsonOrRejectWithError);
};


const postLearningPath = postAuthorized('/learningpath-api/v1/learningpaths');
const postLearningPathStep = postAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps');
const copyLearningPath = postAuthorized('/learningpath-api/v1/learningpaths/:copyfrom/copy');

const createPath = (accessToken, props, body) =>
  postLearningPath(accessToken, props, body)
  .then(lpath => Promise.all(map(body.learningsteps, step =>
      postLearningPathStep(accessToken, { pathId: lpath.id }, step)
    )).then(steps => Object.assign({}, lpath, {
      learningsteps: assureSequenceOrder(steps),
    }))
  )
;

const copyPath = (accessToken, { copyfrom }, body) =>
  copyLearningPath(accessToken, { copyfrom }, body);

const patchLearningPath = patchAuthorized('/learningpath-api/v1/learningpaths/:pathId');
const patchLearningPathStep = patchAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId');

const putSequenceNumber = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId/seqNo');

const updatePath = (accessToken, { pathId }, body) =>
  patchLearningPath(accessToken, { pathId }, body);

const updateStep = (accessToken, { pathId, stepId }, body) =>
  patchLearningPathStep(accessToken, { pathId, stepId }, body);

const createStep = (accessToken, { pathId }, body) =>
  postLearningPathStep(accessToken, { pathId }, body);

const deleteLearningPath = deleteAuthorized('/learningpath-api/v1/learningpaths/:pathId');
const deletePath = (accessToken, { pathId }) =>
  deleteLearningPath(accessToken, { pathId });

const deleteLearningPathStep = deleteAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId');
const deleteStep = (accessToken, { pathId, stepId }) =>
  deleteLearningPathStep(accessToken, { pathId, stepId });

const putLearningPathStepStatus = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId/status');
export const activateDeletedStep = (accessToken, { pathId, stepId }) => putLearningPathStepStatus(accessToken, { pathId, stepId }, { status: 'ACTIVE' });

const putLearningPathStatus = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/status');
const updateStatus = (accessToken, { pathId }, body) =>
  putLearningPathStatus(accessToken, { pathId }, body);

export const activateDeletedPath = (accessToken, { pathId, status }) => putLearningPathStatus(accessToken, { pathId }, { status });

const learningPathsUrl = apiResourceUrl('/learningpath-api/v1/learningpaths');

const updateSeqNo = (accessToken, { pathId, stepId }, body) =>
  putSequenceNumber(accessToken, { pathId, stepId }, body);

const fetchPaths = (accessToken, query) => {
  let url = learningPathsUrl;
  if (query) {
    const q = cloneDeep(query);
    if (q.pageSize !== undefined) {
      q['page-size'] = q.pageSize;
      delete q.pageSize;
    }
    if (q.query === '') {
      delete q.query;
    }

    url += `?${queryString.stringify(q)}`;
  }
  return fetch(url, { headers: { Authorization: authorizationHeader(accessToken) } }).then(resolveJsonOrRejectWithError);
};

const oembedUrl = apiResourceUrl('/oembed-proxy/v1/oembed');
const fetchOembedUrl = (accessToken, query) => {
  let url = oembedUrl;
  url += `?${queryString.stringify(query)}`;
  return fetch(url, { headers: { Authorization: authorizationHeader(accessToken) } }).then(resolveJsonOrRejectWithError);
};


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
  updateStep,
  deleteStep,
  updateSeqNo,
  copyPath,
  fetchPathTags,
  fetchPathLicenses,
};
