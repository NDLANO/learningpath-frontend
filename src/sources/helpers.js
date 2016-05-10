import 'isomorphic-fetch';
import { formatPattern } from 'react-router/lib/PatternUtils';
import defined from 'defined';

/* #if development */
export const isUnitTest = (() => typeof window === 'undefined')();
/* #end */

const locationOrigin = (() => {
  /* #if development */
  if (isUnitTest) { return 'http://ndla-frontend'; }
  /* #end */
  if (typeof location.origin === 'undefined') {
    location.origin = [location.protocol, '//', location.host, ':', location.port].join('');
  }

  return location.origin;
})();

export const defaultApiKey = (() => {
  /* #if development */
  if (isUnitTest) { return 'ndlatestapikey'; }
  /* #end */
  return window.NDLA_DEFAULT_API_KEY;
})();

const apiBaseUrl = (() => {
  /* #if development */
  if (isUnitTest) { return 'http://ndla-api'; }
  /* #end */
  return defined(window.NDLA_API_URL, locationOrigin);
})();


export { locationOrigin, apiBaseUrl };

export function apiResourceUrl (path) { return apiBaseUrl + path; }

export function createErrorPayload (status, message, json) {
  return Object.assign(new Error(message), { status, json });
}

export function resolveJsonOrRejectWithError (res) {
  return new Promise((resolve, reject) => (res.ok) ?
    res.status === 204 ?
    resolve() :
    resolve(res.json()) :
    res.json()
      .then(json => createErrorPayload(res.status, defined(json.message, res.statusText), json))
      .then( reject )
  );
}


export function fetchAuthorized (path, method = 'GET') {
  const url = params => apiResourceUrl(formatPattern(path, params));
  return (authToken, params = {}) => fetch(url(params), {
    method, headers: {'APP-KEY': authToken}
  }).then( resolveJsonOrRejectWithError );
}

export function postAuthorized (path) {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: {'APP-KEY': authToken},
    method: 'POST',
    body: JSON.stringify(body)
  }).then( resolveJsonOrRejectWithError );
}

export function putAuthorized (path) {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}, body) => fetch(url(params), {
    headers: {'APP-KEY': authToken},
    method: 'PUT',
    body: JSON.stringify(body)
  }).then( resolveJsonOrRejectWithError );
}

export function deleteAuthorized(path) {
  const url = params => apiResourceUrl(formatPattern(path, params));
  return (authToken, params = {}) => fetch(url(params), {
    headers: {'APP-KEY': authToken},
    method: 'DELETE'
  });
}
