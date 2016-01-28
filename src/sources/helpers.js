import 'isomorphic-fetch';
import defined from 'defined';

let apiBaseUrl = 'http://api.test.ndla.no';

/* #if development */
apiBaseUrl = 'http://localhost:3000';
/* #end */

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
