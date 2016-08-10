/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import sortBy from 'lodash/sortBy';

export default function assureSequenceOrder(objects) {
  return sortBy(objects, 'seqNo').map((obj, seqNo) => Object.assign(obj, { seqNo }));
}
