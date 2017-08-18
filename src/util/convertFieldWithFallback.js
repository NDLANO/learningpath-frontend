/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export function convertFieldWithFallback(element, field, fallback) {
  return element[field] ? element[field][field] : fallback;
}
