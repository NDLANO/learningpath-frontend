/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import formatUrl from '../util/formatUrlUtil';
import { fetchAuth } from './fetchAuth';
import fetch from './fetch';
import {
  resolveJsonOrRejectWithError,
  createErrorPayload,
} from './resolveJsonOrRejectWithError';
import { apiBaseUrl, locationOrigin } from './apiConstants';

export {
  locationOrigin,
  createErrorPayload,
  apiBaseUrl,
  resolveJsonOrRejectWithError,
};

export function apiResourceUrl(path) {
  return apiBaseUrl + path;
}

export function ApiError(message, res = {}, json) {
  this.name = 'ApiError';
  this.message = message;
  this.url = res.url;
  this.status = res.status;
  this.json = json;
  this.code = json.code;
  // Drop creating a stack for easier unit testing
  // The stack does'nt give any value as long as the ApiError is only created in createErrorPayload()
  // this.stack = (new Error()).stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

export function fetchAuthorized(path, method = 'GET') {
  const url = params => apiResourceUrl(formatUrl(path, params));
  return (params = {}, language) => {
    const query = language ? `?language=${language}&fallback=true` : '';
    return fetchAuth(`${url(params)}${query}`, { method }).then(
      resolveJsonOrRejectWithError,
    );
  };
}

export function postAuthorized(path) {
  const url = params => apiResourceUrl(formatUrl(path, params));

  return (params = {}, body) =>
    fetchAuth(url(params), {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(resolveJsonOrRejectWithError);
}

export function putAuthorized(path) {
  const url = params => apiResourceUrl(formatUrl(path, params));

  return (params = {}, body) =>
    fetchAuth(url(params), {
      method: 'PUT',
      body: JSON.stringify(body),
    }).then(resolveJsonOrRejectWithError);
}

export function patchAuthorized(path) {
  const url = params => apiResourceUrl(formatUrl(path, params));

  return (params = {}, body) =>
    fetchAuth(url(params), {
      method: 'PATCH',
      body: JSON.stringify(body),
    }).then(resolveJsonOrRejectWithError);
}

export function deleteAuthorized(path) {
  const url = params => apiResourceUrl(formatUrl(path, params));
  return (params = {}) =>
    fetchAuth(url(params), {
      method: 'DELETE',
    });
}
