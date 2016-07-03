import 'isomorphic-fetch';
import { formatPattern } from 'react-router/lib/PatternUtils';
import defined from 'defined';

if (process.env.NODE_ENV === 'unittest') {
  global.__SERVER__ = false; //eslint-disable-line
}

const NDLA_API_URL = process.env.APIHOST || 'http://api.test.ndla.no';
const NDLA_DEFAULT_API_KEY = process.env.APIKEY || 'ndlalearningpathfrontend';

const locationOrigin = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://ndla-frontend';
  }

  if (__SERVER__) {
    // TODO
    return undefined;
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

  return NDLA_DEFAULT_API_KEY;
})();

const apiBaseUrl = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://ndla-api';
  }

  return defined(NDLA_API_URL, locationOrigin);
})();


export { locationOrigin, apiBaseUrl };

export function apiResourceUrl(path) { return apiBaseUrl + path; }

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
  const url = params => apiResourceUrl(formatPattern(path, params));
  return (authToken, params = {}) => fetch(url(params), {
    method, headers: {'APP-KEY': authToken}
  }).then(resolveJsonOrRejectWithError);
}

export function postAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: {'APP-KEY': authToken},
    method: 'POST',
    body: JSON.stringify(body)
  }).then(resolveJsonOrRejectWithError);
}

export function putAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: {'APP-KEY': authToken},
    method: 'PUT',
    body: JSON.stringify(body)
  }).then(resolveJsonOrRejectWithError);
}

export function patchAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: {'APP-KEY': authToken},
    method: 'PATCH',
    body: JSON.stringify(body)
  }).then(resolveJsonOrRejectWithError);
}

export function deleteAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));
  return (authToken, params = {}) => fetch(url(params), {
    headers: {'APP-KEY': authToken},
    method: 'DELETE'
  });
}
