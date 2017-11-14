/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createErrorPayload } from '../../sources/helpers';

export default function payload403invalid(url) {
  return createErrorPayload({ status: 403, url }, 'Invalid', {
    message: 'Invalid',
  });
}
