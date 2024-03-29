/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function formatUrl(url, params) {
  return url
    .split("/")
    .map((param) => params[param.replace(":", "")] || param)
    .join("/");
}

export default formatUrl;
