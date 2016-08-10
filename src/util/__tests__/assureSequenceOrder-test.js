/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import assureSequenceOrder from '../assureSequenceOrder';

const pluckIds = steps => steps.map(step => step.id);
const pluckSeqNo = steps => steps.map(step => step.seqNo);

test('util/assureSequenceOrder', t => {
  let actual = assureSequenceOrder([
      { id: 3, seqNo: 2 },
      { id: 2, seqNo: 1 },
      { id: 1, seqNo: 0 },
  ]);

  t.deepEqual(pluckIds(actual), [1, 2, 3]);

  actual = assureSequenceOrder([
      { id: 4, seqNo: 5 },
      { id: 2, seqNo: 2 },
      { id: 3, seqNo: 3 },
      { id: 1, seqNo: -1 },
      { id: 2, seqNo: 2 },
  ]);

  t.deepEqual(pluckIds(actual), [1, 2, 2, 3, 4]);
  t.deepEqual(pluckSeqNo(actual), [0, 1, 2, 3, 4]);

  t.deepEqual(assureSequenceOrder(undefined), []);

  t.end();
});
