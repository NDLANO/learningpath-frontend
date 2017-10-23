/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { formattedEmbedDescription, formattedEmbedUrl, formattedEmbedLicense } from '../formOperationsUtil';

test('util/formattedEmbedUrl', () => {
  const embedObject = {
    embedType: 'oembed',
    url: 'https://ndla.no/id/3',
  };

  expect(typeof formattedEmbedUrl).toBe('function');
  expect(formattedEmbedUrl(embedObject)).toEqual({
    embedType: 'oembed',
    url: 'https://ndla.no/id/3',
  })
});

test('util/formattedEmbedUrl empty url', () => {
  expect(typeof formattedEmbedUrl).toEqual('function');
  expect(formattedEmbedUrl({url: '', embedType: 'oembed'})).toEqual(undefined)
  expect(formattedEmbedUrl(undefined)).toEqual(undefined)
  expect(formattedEmbedUrl({url: '', embedType: ''})).toEqual(undefined)
  expect(formattedEmbedUrl({})).toEqual(undefined)
});

test('util/formattedEmbedUrl', () => {
  expect(typeof formattedEmbedDescription).toBe('function');
  expect(formattedEmbedDescription('test')).toBe('test')
});

test('util/formattedEmbedDescription empty description', () => {
  expect(typeof formattedEmbedUrl).toBe('function');
  expect(formattedEmbedDescription('')).toEqual('')
  expect(formattedEmbedDescription(undefined)).toEqual('')
});

test('util/formattedEmbedLicense', () => {
  const licenseObject = {
    license: 'by-sa',
  };

  expect(typeof formattedEmbedDescription).toBe('function');
  expect(formattedEmbedLicense(licenseObject)).toBe('by-sa')
});

test('util/formattedEmbedLicense empty description', () => {
  expect(typeof formattedEmbedUrl).toBe('function');
  expect(formattedEmbedLicense('')).toEqual('')
  expect(formattedEmbedLicense(undefined)).toEqual('')
  expect(formattedEmbedLicense({})).toEqual('')
  expect(formattedEmbedLicense({license: ''})).toEqual('')
});
