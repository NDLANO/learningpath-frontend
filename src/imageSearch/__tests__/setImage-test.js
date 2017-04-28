/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import { isFSA } from 'flux-standard-action';
import { setSelectedImage, setSavedImage } from '../imageActions';


test('actions/setSelecteImage', () => {
  const actual = setSelectedImage(
    { id: '123345' }
  );

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_SELECTED_IMAGE');
  expect(actual.payload).toEqual({ id: '123345' });
  expect(actual.error).toBeFalsy();
});

test('actions/setSelecteImage with error', () => {
  const actual = setSelectedImage(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_SELECTED_IMAGE');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});


test('actions/setSavedImage', () => {
  const actual = setSavedImage(
    { id: '123345' }
  );

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_SAVED_IMAGE');
  expect(actual.payload).toEqual({ id: '123345' });
  expect(actual.error).toBeFalsy();
});

test('actions/setSavedImage with error', () => {
  const actual = setSavedImage(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_SAVED_IMAGE');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
