import defined from 'defined';

const url = (typeof window === 'undefined') ?
  (path) => 'http://localhost:8080' + path :
  (path) => path;

function resolveJsonOrRejectWithError (res) {
  return new Promise((resolve, reject) => (res.ok) ?
    resolve(res.json()) :
    res.json()
      .then(d => new Error(defined(d.message, res.statusText)))
      .then( reject )
  );
}

export default function fetchAboutMe (authToken) {
  return fetch(url('/auth/me'), {
    method: 'GET',
    headers: {'APP-KEY': authToken}
  }).then( resolveJsonOrRejectWithError );
}
