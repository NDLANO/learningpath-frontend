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
import { fetchAuthorized, postAuthorized, putAuthorized, patchAuthorized, deleteAuthorized, resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const fetchPath = fetchAuthorized('/learningpath-api/v1/learningpaths/:pathId');
const fetchPathStep = fetchAuthorized(
    '/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId');
const fetchMyPaths = fetchAuthorized('/learningpath-api/v1/learningpaths/mine');
const fetchPathTags = fetchAuthorized('/learningpath-api/v1/learningpaths/tags');
const fetchPathLicenses = (authToken, filter) => {
  let url = apiResourceUrl('/learningpath-api/v1/learningpaths/licenses');
  if (filter.length > 0) {
    const query = { filter };
    url += `?${queryString.stringify(query)}`;
  }
  return fetch(url, { headers: { 'APP-KEY': authToken } }).then(resolveJsonOrRejectWithError);
};


const postLearningPath = postAuthorized('/learningpath-api/v1/learningpaths');
const postLearningPathStep = postAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps');
const copyLearningPath = postAuthorized('/learningpath-api/v1/learningpaths/:copyfrom/copy');

const createPath = (authToken, props, body) =>
  postLearningPath(authToken, props, body)
  .then(lpath => Promise.all(map(body.learningsteps, step =>
      postLearningPathStep(authToken, { pathId: lpath.id }, step)
    )).then(steps => Object.assign({}, lpath, {
      learningsteps: assureSequenceOrder(steps),
    }))
  )
;

const copyPath = (authToken, { copyfrom }, body) =>
  copyLearningPath(authToken, { copyfrom }, body);

const patchLearningPath = patchAuthorized('/learningpath-api/v1/learningpaths/:pathId');
const patchLearningPathStep = patchAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId');

const putSequenceNumber = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId/seqNo');

const updatePath = (authToken, { pathId }, body) =>
  patchLearningPath(authToken, { pathId }, body);

const updateStep = (authToken, { pathId, stepId }, body) =>
  patchLearningPathStep(authToken, { pathId, stepId }, body);

const createStep = (authToken, { pathId }, body) =>
  postLearningPathStep(authToken, { pathId }, body);

const deleteLearningPath = deleteAuthorized('/learningpath-api/v1/learningpaths/:pathId');
const deletePath = (authToken, { pathId }) =>
  deleteLearningPath(authToken, { pathId });

const deleteLearningPathStep = deleteAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId');
const deleteStep = (authToken, { pathId, stepId }) =>
  deleteLearningPathStep(authToken, { pathId, stepId });

const putLearningPathStepStatus = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId/status');
export const activateDeletedStep = (authToken, { pathId, stepId }) => putLearningPathStepStatus(authToken, { pathId, stepId }, { status: 'ACTIVE' });

const putLearningPathStatus = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/status');
const updateStatus = (authToken, { pathId }, body) =>
  putLearningPathStatus(authToken, { pathId }, body);

export const activateDeletedPath = (authToken, { pathId, status }) => putLearningPathStatus(authToken, { pathId }, { status });

const learningPathsUrl = apiResourceUrl('/learningpath-api/v1/learningpaths');

const updateSeqNo = (authToken, { pathId, stepId }, body) =>
  putSequenceNumber(authToken, { pathId, stepId }, body);

const fetchPaths = (authToken, query) => {
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
  return fetch(url, { headers: { 'APP-KEY': authToken } }).then(resolveJsonOrRejectWithError);
};

const oembedUrl = apiResourceUrl('/oembed-proxy/v1/oembed');
const fetchOembedUrl = (authToken, query) => {
  let url = oembedUrl;
  url += `?${queryString.stringify(query)}`;
  return fetch(url, { headers: { 'APP-KEY': authToken } }).then(resolveJsonOrRejectWithError);
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
