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
const fetchPathLicenses = (token, filter) => {
  let url = apiResourceUrl('/learningpath-api/v1/learningpaths/licenses');
  if (filter.length > 0) {
    const query = { filter };
    url += `?${queryString.stringify(query)}`;
  }
  return fetch(url, { headers: { Authorization: authorizationHeader(token) } }).then(resolveJsonOrRejectWithError);
};


const postLearningPath = postAuthorized('/learningpath-api/v1/learningpaths');
const postLearningPathStep = postAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps');
const copyLearningPath = postAuthorized('/learningpath-api/v1/learningpaths/:copyfrom/copy');

const createPath = (token, props, body) =>
  postLearningPath(token, props, body)
  .then(lpath => Promise.all(map(body.learningsteps, step =>
      postLearningPathStep(token, { pathId: lpath.id }, step)
    )).then(steps => Object.assign({}, lpath, {
      learningsteps: assureSequenceOrder(steps),
    }))
  )
;

const copyPath = (token, { copyfrom }, body) =>
  copyLearningPath(token, { copyfrom }, body);

const patchLearningPath = patchAuthorized('/learningpath-api/v1/learningpaths/:pathId');
const patchLearningPathStep = patchAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId');

const putSequenceNumber = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId/seqNo');

const updatePath = (token, { pathId }, body) =>
  patchLearningPath(token, { pathId }, body);

const updateStep = (token, { pathId, stepId }, body) =>
  patchLearningPathStep(token, { pathId, stepId }, body);

const createStep = (token, { pathId }, body) =>
  postLearningPathStep(token, { pathId }, body);

const deleteLearningPath = deleteAuthorized('/learningpath-api/v1/learningpaths/:pathId');
const deletePath = (token, { pathId }) =>
  deleteLearningPath(token, { pathId });

const deleteLearningPathStep = deleteAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId');
const deleteStep = (token, { pathId, stepId }) =>
  deleteLearningPathStep(token, { pathId, stepId });

const putLearningPathStepStatus = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/learningsteps/:stepId/status');
export const activateDeletedStep = (token, { pathId, stepId }) => putLearningPathStepStatus(token, { pathId, stepId }, { status: 'ACTIVE' });

const putLearningPathStatus = putAuthorized('/learningpath-api/v1/learningpaths/:pathId/status');
const updateStatus = (token, { pathId }, body) =>
  putLearningPathStatus(token, { pathId }, body);

export const activateDeletedPath = (token, { pathId, status }) => putLearningPathStatus(token, { pathId }, { status });

const learningPathsUrl = apiResourceUrl('/learningpath-api/v1/learningpaths');

const updateSeqNo = (token, { pathId, stepId }, body) =>
  putSequenceNumber(token, { pathId, stepId }, body);

const fetchPaths = (token, query) => {
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
  return fetch(url, { headers: { Authorization: authorizationHeader(token) } }).then(resolveJsonOrRejectWithError);
};

const oembedUrl = apiResourceUrl('/oembed-proxy/v1/oembed');
const fetchOembedUrl = (token, query) => {
  let url = oembedUrl;
  url += `?${queryString.stringify(query)}`;
  return fetch(url, { headers: { Authorization: authorizationHeader(token) } }).then(resolveJsonOrRejectWithError);
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
