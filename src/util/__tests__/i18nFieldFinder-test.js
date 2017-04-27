/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { oembedContentI18N, titleI18N } from '../i18nFieldFinder';

test('util/i18nFieldFinder titleI18N', () => {
  const learningPathStep = {
    title: [
      { title: 'Bokmål', language: 'nb' },
      { title: 'Nynorsk', language: 'nn' },
      { title: 'English', language: 'en' },
    ],
  };

  expect(titleI18N(learningPathStep, 'nb')).toEqual('Bokmål');
  expect(titleI18N(learningPathStep, 'nn')).toEqual('Nynorsk');
  expect(titleI18N(learningPathStep, 'en')).toEqual('English');
  expect(titleI18N(learningPathStep, 'es')).toEqual(undefined);
});

test('util/i18nFieldFinder titleI18N with fallback', () => {
  const learningPathStep1 = {
    title: [
      { title: 'Bokmål', language: 'nb' },
      { title: 'English', language: 'en' },
    ],
  };

  expect(titleI18N(learningPathStep1, 'nb', true)).toEqual('Bokmål');
  expect(titleI18N(learningPathStep1, 'en', true)).toEqual('English');
  expect(titleI18N(learningPathStep1, 'nn', true)).toEqual('Bokmål');

  const learningPathStep2 = {
    title: [
      { title: 'English', language: 'en' },
    ],
  };

  expect(titleI18N(learningPathStep2, 'nb', true)).toEqual('English');
  expect(titleI18N(learningPathStep2, 'en', true)).toEqual('English');
  expect(titleI18N(learningPathStep2, 'es', true)).toEqual('English');
});

test('util/i18nFieldFinder oembedContentI18N', () => {
  expect(typeof oembedContentI18N).toBe('function');

  const learningPathStep = {
    embedUrl: [
      { url: 'http://example.com/sv', html: '<iframe src="http://example.com/sv">', width: 500, language: 'sv' },
      { url: 'http://example.com', html: '<iframe src="http://example.com">', width: 500, language: 'nb' },
    ],
  };

  expect(oembedContentI18N(learningPathStep, 'nb')).toEqual(
    { url: 'http://example.com', html: '<iframe src="http://example.com">', width: 500, language: 'nb' }
  );

  expect(oembedContentI18N(learningPathStep, 'eo')).toBeFalsy();
});
