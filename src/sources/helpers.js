import 'isomorphic-fetch';
import defined from 'defined';

const locationOrigin = (() => {
  /* #if development */
  if (typeof window === 'undefined') {
    // Value when running as unit test.
    return 'http://localhost:1234';
  }
  /* #end */
  if (typeof location.origin === 'undefined') {
    location.origin = [location.protocol, '//', location.host, ':', location.port].join('');
  }

  return location.origin;
})();

let apiBaseUrl = 'http://api.test.ndla.no';

/* #if development */
apiBaseUrl = 'http://localhost:3000';
/* #end */

export { locationOrigin };

export function expandPath (path) { return apiBaseUrl + path; }

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
