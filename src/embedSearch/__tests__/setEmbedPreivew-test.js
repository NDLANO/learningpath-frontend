/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { setEmbedPreview, removeEmbedPreview } from '../embedSearchActions';

const oembed = {
  title: 'hei',
  url: 'test.no',
};
test('actions/setEmbedPreview', () => {
  const actual = setEmbedPreview(
    oembed
  );

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_EMBED_PREVIEW');
  expect(actual.payload).toEqual(oembed);
  expect(actual.error).toBeFalsy();
});

test('actions/setEmbedPreview with error', () => {
  const actual = setEmbedPreview(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_EMBED_PREVIEW');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});

test('actions/removeEmbedPreview', () => {
  const actual = removeEmbedPreview({});

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('REMOVE_EMBED_PREVIEW');
  expect(actual.payload).toEqual({});
  expect(actual.error).toBeFalsy();
});

test('actions/removeEmbedPreview with error', () => {
  const actual = removeEmbedPreview(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('REMOVE_EMBED_PREVIEW');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
