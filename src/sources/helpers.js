/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import { formatPattern } from 'react-router/lib/PatternUtils';
import defined from 'defined';
import config from '../config';

const NDLA_LEARNINGPATH_API_URL = __SERVER__ ? config.ndlaLearningPathApiUrl : window.config.ndlaLearningPathApiUrl;
const NDLA_IMAGE_API_URL = __SERVER__ ? config.ndlaImageApiUrl : window.config.ndlaImageApiUrl;
const NDLA_OEMBED_PROXY_URL = __SERVER__ ? config.ndlaOembedProxyUrl : window.config.ndlaOembedProxyUrl;
const NDLA_AUTH_URL = __SERVER__ ? config.ndlaAuthUrl : window.config.ndlaAuthUrl;
const NDLA_LEARNINGPATH_API_KEY = __SERVER__ ? config.ndlaLearningPathApiKey : window.config.ndlaLearningPathApiKey;

if (process.env.NODE_ENV === 'unittest') {
  global.__SERVER__ = false; //eslint-disable-line
}

export const locationOrigin = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://ndla-frontend';
  }

  if (typeof location.origin === 'undefined') {
    location.origin = [location.protocol, '//', location.host, ':', location.port].join('');
  }

  return location.origin;
})();

export const defaultApiKey = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'ndlatestapikey';
  }

  return NDLA_LEARNINGPATH_API_KEY;
})();


export function learningPathApiResourceUrl(path) {
  if (process.env.NODE_ENV === 'unittest') {
    return `http://ndla-api${path}`;
  }

  return defined(NDLA_LEARNINGPATH_API_URL, locationOrigin) + path;
}

export function authResourceUrl(path) {
  if (process.env.NODE_ENV === 'unittest') {
    return `http://ndla-api${path}`;
  }

  return defined(NDLA_AUTH_URL, locationOrigin) + path;
}

export function imageApiResourceUrl(path) {
  if (process.env.NODE_ENV === 'unittest') {
    return `http://ndla-api${path}`;
  }

  return defined(NDLA_IMAGE_API_URL, locationOrigin) + path;
}

export function oembedProxyResourceUrl(path) {
  if (process.env.NODE_ENV === 'unittest') {
    return `http://ndla-api${path}`;
  }

  return defined(NDLA_OEMBED_PROXY_URL, locationOrigin) + path;
}

export function createErrorPayload(status, message, json) {
  return Object.assign(new Error(message), { status, json });
}

export function resolveJsonOrRejectWithError(res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return res.status === 204 ? resolve() : resolve(res.json());
    }
    return res.json()
      .then(json => createErrorPayload(res.status, defined(json.message, res.statusText), json))
      .then(reject);
  });
}


export function fetchAuthorized(path, method = 'GET') {
  const url = params => learningPathApiResourceUrl(formatPattern(path, params));
  return (authToken, params = {}) => fetch(url(params), {
    method, headers: { 'APP-KEY': authToken },
  }).then(resolveJsonOrRejectWithError);
}

export function postAuthorized(path) {
  const url = params => learningPathApiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: { 'APP-KEY': authToken },
    method: 'POST',
    body: JSON.stringify(body),
  }).then(resolveJsonOrRejectWithError);
}

export function putAuthorized(path) {
  const url = params => learningPathApiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: { 'APP-KEY': authToken },
    method: 'PUT',
    body: JSON.stringify(body),
  }).then(resolveJsonOrRejectWithError);
}

export function patchAuthorized(path) {
  const url = params => learningPathApiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: { 'APP-KEY': authToken },
    method: 'PATCH',
    body: JSON.stringify(body),
  }).then(resolveJsonOrRejectWithError);
}

export function deleteAuthorized(path) {
  const url = params => learningPathApiResourceUrl(formatPattern(path, params));
  return (authToken, params = {}) => fetch(url(params), {
    headers: { 'APP-KEY': authToken },
    method: 'DELETE',
  });
}
