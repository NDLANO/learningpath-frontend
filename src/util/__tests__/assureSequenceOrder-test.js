/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import assureSequenceOrder from '../assureSequenceOrder';

const pluckIds = steps => steps.map(step => step.id);
const pluckSeqNo = steps => steps.map(step => step.seqNo);

test('util/assureSequenceOrder', () => {
  let actual = assureSequenceOrder([
    { id: 3, seqNo: 2 },
    { id: 2, seqNo: 1 },
    { id: 1, seqNo: 0 },
  ]);

  expect(pluckIds(actual)).toEqual([1, 2, 3]);

  actual = assureSequenceOrder([
    { id: 4, seqNo: 5 },
    { id: 2, seqNo: 2 },
    { id: 3, seqNo: 3 },
    { id: 1, seqNo: -1 },
    { id: 2, seqNo: 2 },
  ]);

  expect(pluckIds(actual)).toEqual([1, 2, 2, 3, 4]);
  expect(pluckSeqNo(actual)).toEqual([0, 1, 2, 3, 4]);

  expect(assureSequenceOrder(undefined)).toEqual([]);
});
