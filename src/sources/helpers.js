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

const NDLA_API_URL = __SERVER__ ? config.ndlaApiUrl : window.config.ndlaApiUrl;
const NDLA_API_KEY = __SERVER__ ? config.ndlaApiKey : window.config.ndlaApiKey;

if (process.env.NODE_ENV === 'unittest') {
  global.__SERVER__ = false; //eslint-disable-line
}

const locationOrigin = (() => {
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

  return NDLA_API_KEY;
})();

const apiBaseUrl = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://ndla-api';
  }

  return defined(NDLA_API_URL, locationOrigin);
})();


export { locationOrigin, apiBaseUrl };

export function apiResourceUrl(path) { return apiBaseUrl + path; }

export function ApiError(message, res = {}, json) {
  this.name = 'ApiError';
  this.message = message;
  this.url = res.url;
  this.status = res.status;
  this.json = json;
  this.stack = (new Error()).stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

export function createErrorPayload(res, message, json) {
  return new ApiError(`${res.status} ${message} ${json.code} ${json.description}`, res, json);
}

export function resolveJsonOrRejectWithError(res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return res.status === 204 ? resolve() : resolve(res.json());
    }
    return res.json()
      .then(json => createErrorPayload(res, defined(json.message, res.statusText), json))
      .then(reject);
  });
}


export function fetchAuthorized(path, method = 'GET') {
  const url = params => apiResourceUrl(formatPattern(path, params));
  return (authToken, params = {}) => fetch(url(params), {
    method, headers: { 'APP-KEY': authToken },
  }).then(resolveJsonOrRejectWithError);
}

export function postAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: { 'APP-KEY': authToken },
    method: 'POST',
    body: JSON.stringify(body),
  }).then(resolveJsonOrRejectWithError);
}

export function putAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: { 'APP-KEY': authToken },
    method: 'PUT',
    body: JSON.stringify(body),
  }).then(resolveJsonOrRejectWithError);
}

export function patchAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: { 'APP-KEY': authToken },
    method: 'PATCH',
    body: JSON.stringify(body),
  }).then(resolveJsonOrRejectWithError);
}

export function deleteAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));
  return (authToken, params = {}) => fetch(url(params), {
    headers: { 'APP-KEY': authToken },
    method: 'DELETE',
  });
}
