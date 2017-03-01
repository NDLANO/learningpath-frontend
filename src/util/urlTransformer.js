/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import startsWith from 'lodash/startsWith';
import endsWith from 'lodash/endsWith';


export function removeSlashOembed(url) {
  return endsWith(url, '/oembed') ? url.replace('/oembed', '') : url;
}
export function transformHttpToHttps(url) {
  return startsWith(url, 'http:') ? `https${url.substring(4, url.length)}` : url;
}

export function transformNdlaUrl(url) {
  let newUrl = transformHttpToHttps(url);
  newUrl = removeSlashOembed(newUrl);
  return newUrl;
}
