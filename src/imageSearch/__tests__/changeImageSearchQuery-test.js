/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { changeImageSearchQuery } from '../imageActions';


test('actions/changeImageSearchQuery', () => {
  const actual = changeImageSearchQuery({ query: 'test', 'page-size': 16, page: 1 });

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('CHANGE_IMAGE_SEARCH_QUERY');
  expect(actual.payload).toEqual({ query: 'test', 'page-size': 16, page: 1 });
  expect(actual.error).toBeFalsy();
});

test('actions/changeImageSearchQuery with error', () => {
  const actual = changeImageSearchQuery(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('CHANGE_IMAGE_SEARCH_QUERY');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
