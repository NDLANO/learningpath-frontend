import 'isomorphic-fetch';
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

const apiUrl = (() => {
  /* #if development */
  if (isUnitTest) { return 'http://ndla-api'; }
  /* #end */
  return defined(window.NDLA_API_URL, locationOrigin);
})();


export { locationOrigin, apiUrl };

export function expandPath (path) { return apiUrl + path; }

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
  const url = expandPath(path);
  return function (authToken) {
    return fetch(url, {
      method,
      headers: {'APP-KEY': authToken}
    }).then( resolveJsonOrRejectWithError );
  };
}
