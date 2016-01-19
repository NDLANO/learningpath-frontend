import 'isomorphic-fetch';
import defined from 'defined';

const expandPath = (typeof window === 'undefined') ?
  (path) => 'http://localhost:8080' + path :
  (path) => path;

export function resolveJsonOrRejectWithError (res) {
  return new Promise((resolve, reject) => (res.ok) ?
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
