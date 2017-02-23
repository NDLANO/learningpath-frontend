/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import startsWith from 'lodash/startsWith';

export default function transformHttpToHttps(url) {
  return startsWith(url, 'http:') ? `https${url.substring(4, url.length)}` : url;
}
