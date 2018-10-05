/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import defined from 'defined';
import config from '../config';
import formatUrl from '../util/formatUrlUtil';
import { fetchAuth } from './fetchAuth';

const NDLA_API_URL = config.ndlaApiUrl;
const NDLA_ACCESS_TOKEN = config.accessToken;
const AUTH0_DOMAIN = config.auth0Domain;
const NDLA_PERSONAL_CLIENT_ID = config.ndlaPersonalClientId;

/* if (process.env.NODE_ENV === 'unittest') {
  global.__SERVER__ = false; //eslint-disable-line
} */

const locationOrigin = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://ndla-frontend';
  }

  if (process.env.BUILD_TARGET === 'server') {
    return '';
  }

  if (typeof window.location.origin === 'undefined') {
    window.location.origin = [
      window.location.protocol,
      '//',
      window.location.host,
      ':',
      window.location.port,
    ].join('');
  }

  return window.location.origin;
})();

export const ndlaPersonalClientId = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return '123456789';
  }
  return NDLA_PERSONAL_CLIENT_ID;
})();

export const auth0Domain = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://auth-ndla';
  }
  return AUTH0_DOMAIN;
})();

export const accessToken = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'ndlatestapikey';
  }
  return NDLA_ACCESS_TOKEN;
})();

const apiBaseUrl = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://ndla-api';
  }

  return defined(NDLA_API_URL, locationOrigin);
})();

export { locationOrigin, apiBaseUrl };

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

export function createErrorPayload(res, message, json) {
  return new ApiError(
    `${res.status} ${message} ${json.code} ${json.description}`,
    res,
    json,
  );
}

export function resolveJsonOrRejectWithError(res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return res.status === 204 ? resolve() : resolve(res.json());
    }
    return res
      .json()
      .then(json =>
        createErrorPayload(res, defined(json.message, res.statusText), json),
      )
      .then(reject);
  });
}

export const authorizationHeader = token => `Bearer ${token}`;

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
