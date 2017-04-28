/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import { isFSA } from 'flux-standard-action';
import { setImages } from '../imageActions';


test('actions/setImages', () => {
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

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_IMAGES');
  expect(actual.payload).toEqual({
    page: 1,
    'page-size': 16,
    totalCount: 2,
    results: [
      { id: '12345' }, { id: '67890' },
    ],
  });
  expect(actual.error).toBeFalsy();
});

test('actions/setImages with error', () => {
  const actual = setImages(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_IMAGES');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
