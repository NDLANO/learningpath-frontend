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

const fetchPath = fetchAuthorized('/learningpaths/:pathId');
const fetchPathStep = fetchAuthorized(
    '/learningpaths/:pathId/learningsteps/:stepId');
const fetchMyPaths = fetchAuthorized('/learningpaths/mine');
const fetchPathTags = fetchAuthorized('/learningpaths/tags');
const fetchPathLicenses = fetchAuthorized('/learningpaths/licenses');


const postLearningPath = postAuthorized('/learningpaths');
const postLearningPathStep = postAuthorized('/learningpaths/:pathId/learningsteps');
const copyLearningPath = postAuthorized('/learningpaths/:copyfrom/copy');

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

const patchLearningPath = patchAuthorized('/learningpaths/:pathId');
const patchLearningPathStep = patchAuthorized('/learningpaths/:pathId/learningsteps/:stepId');

const putSequenceNumber = putAuthorized('/learningpaths/:pathId/learningsteps/:stepId/seqNo');

const updatePath = (authToken, { pathId }, body) =>
  patchLearningPath(authToken, { pathId }, body);

const updateStep = (authToken, { pathId, stepId }, body) =>
  patchLearningPathStep(authToken, { pathId, stepId }, body);

const createStep = (authToken, { pathId }, body) =>
  postLearningPathStep(authToken, { pathId }, body);

const deleteLearningPath = deleteAuthorized('/learningpaths/:pathId');
const deletePath = (authToken, { pathId }) =>
  deleteLearningPath(authToken, { pathId });

const deleteLearningPathStep = deleteAuthorized('/learningpaths/:pathId/learningsteps/:stepId');
const deleteStep = (authToken, { pathId, stepId }) =>
  deleteLearningPathStep(authToken, { pathId, stepId });

const putLearningPathStepStatus = putAuthorized('/learningpaths/:pathId/learningsteps/:stepId/status');
export const activateDeletedStep = (authToken, { pathId, stepId }) => putLearningPathStepStatus(authToken, { pathId, stepId }, { status: 'ACTIVE' });

const putLearningPathStatus = putAuthorized('/learningpaths/:pathId/status');
const updateStatus = (authToken, { pathId }, body) =>
  putLearningPathStatus(authToken, { pathId }, body);

const learningPathsUrl = apiResourceUrl('/learningpaths');

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

const oembedUrl = apiResourceUrl('/oembed');
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
