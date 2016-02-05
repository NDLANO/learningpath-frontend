import 'isomorphic-fetch';
import { formatPattern } from 'react-router/lib/PatternUtils';
import defined from 'defined';

/* #if development */
const isUnitTest = typeof window === 'undefined';
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

const apiBaseUrl = (() => {
  /* #if development */
  if (isUnitTest) { return 'http://ndla-api'; }
  /* #end */
  return defined(window.NDLA_API_URL, locationOrigin);
})();


export { locationOrigin };

export function apiResourceUrl (path) { return apiBaseUrl + path; }

export function resolveJsonOrRejectWithError (res) {
  return new Promise((resolve, reject) => (res.ok) ?
    res.status === 204 ?
    resolve() :
    resolve(res.json()) :
    res.json()
      .then(d => new Error(defined(d.message, res.statusText)))
      .then( reject )
  );
}


export function fetchAuthorized (path, method = 'GET') {
  const url = params => apiResourceUrl(formatPattern(path, params));

  return (authToken, params = {}) => fetch(url(params), {
    method, headers: {'APP-KEY': authToken}
  }).then( resolveJsonOrRejectWithError );
}
