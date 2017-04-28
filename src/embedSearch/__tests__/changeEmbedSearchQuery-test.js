/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { changeEmbedSearchQuery } from '../embedSearchActions';

const query = {
  textQuery: 'hei',
  page: 1,
  start: 1,
  filter: '',
};

test('actions/changeEmbedSearchQuery', () => {
  const actual = changeEmbedSearchQuery(
    query
  );

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('CHANGE_EMBED_SEARCH_QUERY');
  expect(actual.payload).toEqual(query);
  expect(actual.error).toBeFalsy();
});

test('actions/changeEmbedSearchQuery with error', () => {
  const actual = changeEmbedSearchQuery(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('CHANGE_EMBED_SEARCH_QUERY');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
