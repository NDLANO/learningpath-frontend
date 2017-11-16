/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { setEmbedResults } from '../embedSearchActions';

const results = {
  queries: {
    request: [{ totalResults: 20 }],
    items: [{ title: 'hei' }],
  },
};
test('actions/setEmbedResults', () => {
  const actual = setEmbedResults(results);

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_EMBED_RESULTS');
  expect(actual.payload).toEqual(results);
  expect(actual.error).toBeFalsy();
});

test('actions/setEmbedResults with error', () => {
  const actual = setEmbedResults(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_EMBED_RESULTS');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
