/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';
import assureSequenceOrder from '../util/assureSequenceOrder';
import fetch from './fetch';
import {
  fetchAuthorized,
  postAuthorized,
  putAuthorized,
  patchAuthorized,
  deleteAuthorized,
  resolveJsonOrRejectWithError,
  resolveJsonIgnoreOembedFailureOrRejectWithError,
  apiResourceUrl,
} from './helpers';

const baseUrl = apiResourceUrl('/learningpath-api/v2/learningpaths');
// Need to use fetchAuthorized incase the learningpath it private
const fetchPath = fetchAuthorized('/learningpath-api/v2/learningpaths/:pathId');

// Need to use fetchAuthorized incase the step it private
const fetchPathStep = fetchAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId/learningsteps/:stepId',
);

const fetchMyPaths = fetchAuthorized(
  '/learningpath-api/v2/learningpaths/mine/',
);

const fetchPathsWithStatus = fetchAuthorized(
  '/learningpath-api/v2/learningpaths/status/:learningPathStatus',
);

const fetchPathTags = (_, locale) =>
  fetch(`${baseUrl}/tags/?language=${locale}&fallback=true`).then(
    resolveJsonOrRejectWithError,
  );

const fetchPathContributors = () =>
  fetch(`${baseUrl}/contributors/`).then(resolveJsonOrRejectWithError);

const fetchPathLicenses = filter => {
  let url = apiResourceUrl('/learningpath-api/v2/learningpaths/licenses/');
  if (filter.length > 0) {
    const query = { filter };
    url += `?${queryString.stringify(query)}`;
  }
  return fetch(url).then(resolveJsonOrRejectWithError);
};

const postLearningPath = postAuthorized('/learningpath-api/v2/learningpaths/');
const postLearningPathStep = postAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId/learningsteps/',
);
const copyLearningPath = postAuthorized(
  '/learningpath-api/v2/learningpaths/:copyfrom/copy/',
);

const createPath = (props, body) =>
  postLearningPath(props, body).then(lpath =>
    Promise.all(
      map(body.learningsteps, step =>
        postLearningPathStep({ pathId: lpath.id }, step),
      ),
    ).then(steps =>
      Object.assign({}, lpath, {
        learningsteps: assureSequenceOrder(steps),
      }),
    ),
  );

const copyPath = ({ copyfrom }, body) => copyLearningPath({ copyfrom }, body);

const patchLearningPath = patchAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId',
);
const patchLearningPathStep = patchAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId/learningsteps/:stepId',
);

const putSequenceNumber = putAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId/learningsteps/:stepId/seqNo/',
);

const updatePath = ({ pathId }, body) => patchLearningPath({ pathId }, body);

const updateStep = ({ pathId, stepId }, body) =>
  patchLearningPathStep({ pathId, stepId }, body);

const createStep = ({ pathId }, body) => postLearningPathStep({ pathId }, body);

const deleteLearningPath = deleteAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId',
);
const deletePath = ({ pathId }) => deleteLearningPath({ pathId });

const deleteLearningPathStep = deleteAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId/learningsteps/:stepId',
);
const deleteStep = ({ pathId, stepId }) =>
  deleteLearningPathStep({ pathId, stepId });

const putLearningPathStepStatus = putAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId/learningsteps/:stepId/status/',
);
export const activateDeletedStep = ({ pathId, stepId }) =>
  putLearningPathStepStatus({ pathId, stepId }, { status: 'ACTIVE' });

const putLearningPathStatus = putAuthorized(
  '/learningpath-api/v2/learningpaths/:pathId/status/',
);
const updateStatus = ({ pathId }, body) =>
  putLearningPathStatus({ pathId }, body);

export const activateDeletedPath = ({ pathId, status }) =>
  putLearningPathStatus({ pathId }, { status });

const updateSeqNo = ({ pathId, stepId }, body) =>
  putSequenceNumber({ pathId, stepId }, body);

const fetchPaths = (query, locale) => {
  let url = baseUrl;
  if (query) {
    const q = cloneDeep(query);
    if (q.pageSize !== undefined) {
      q['page-size'] = q.pageSize;
      delete q.pageSize;
    }
    if (q.query === '') {
      delete q.query;
    }
    q.language = locale || 'nb';
    q.fallback = true;
    url += `?${queryString.stringify(q)}`;
  }
  return fetch(url).then(resolveJsonOrRejectWithError);
};

const oembedUrl = apiResourceUrl('/oembed-proxy/v1/oembed');
const fetchOembedUrl = query => {
  let url = oembedUrl;
  url += `?${queryString.stringify(query)}`;
  return fetch(url).then(resolveJsonIgnoreOembedFailureOrRejectWithError);
};

export {
  fetchPath,
  fetchPathStep,
  fetchPaths,
  createPath,
  updatePath,
  fetchMyPaths,
  fetchPathsWithStatus,
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
  fetchPathContributors,
};
