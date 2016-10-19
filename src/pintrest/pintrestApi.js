/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'isomorphic-fetch';

export const fetchPins = boardName => fetch(`/pintrest-proxy/boards/${boardName}/pins/?fields=id%2Clink%2Cnote%2Curl%2Coriginal_link`).then(res => (
  new Promise((resolve, reject) => {
    if (res.ok) {
      return resolve(res.json());
    }
    return res.json()
        .then(json => reject(json));
  }))
);
