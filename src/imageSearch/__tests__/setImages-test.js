/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setImages } from '../imageActions';


test('actions/setImages', (t) => {
  const actual = setImages(
    {
      page: 1,
      'page-size': 16,
      totalCount: 2,
      results: [
        { id: '12345' }, { id: '67890' },
      ],
    }
  );

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_IMAGES');
  t.deepEqual(actual.payload,
    {
      page: 1,
      'page-size': 16,
      totalCount: 2,
      results: [
        { id: '12345' }, { id: '67890' },
      ],
    }
);
  t.notOk(actual.error);

  t.end();
});

test('actions/setImages with error', (t) => {
  const actual = setImages(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_IMAGES');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
