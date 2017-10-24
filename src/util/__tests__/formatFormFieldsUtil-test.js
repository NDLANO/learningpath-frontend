/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { formattedEmbedDescription, formattedEmbedUrl, formattedEmbedLicense } from '../formatFormFieldsUtil';

test('util/formattedEmbedUrl no step id', () => {
  const embedObject = {
    embedType: 'oembed',
    url: 'https://ndla.no/id/3',
  };
  expect(typeof formattedEmbedUrl).toBe('function');
  expect(formattedEmbedUrl({}, embedObject)).toEqual({
    embedType: 'oembed',
    url: 'https://ndla.no/id/3',
  })
});

test('util/formattedEmbedUrl with step id', () => {
  const embedObject = {
    embedType: 'oembed',
    url: 'https://ndla.no/id/3',
  };
  expect(typeof formattedEmbedUrl).toBe('function');
  expect(formattedEmbedUrl({id: 1}, embedObject)).toEqual({
    embedType: 'oembed',
    url: 'https://ndla.no/id/3',
  })
});

test('util/formattedEmbedUrl empty url no step id', () => {
  expect(typeof formattedEmbedUrl).toEqual('function');
  expect(formattedEmbedUrl({}, {url: '', embedType: 'oembed'})).toEqual(undefined)
  expect(formattedEmbedUrl({}, undefined)).toEqual(undefined)
  expect(formattedEmbedUrl({}, {url: '', embedType: ''})).toEqual(undefined)
  expect(formattedEmbedUrl({}, {})).toEqual(undefined)
});

test('util/formattedEmbedUrl empty url with step id', () => {
  const emptyUrl = {
    embedType: 'oembed',
    url: '',
  };
  expect(typeof formattedEmbedUrl).toEqual('function');
  expect(formattedEmbedUrl({id: 1}, {url: '', embedType: 'oembed'})).toEqual(emptyUrl)
  expect(formattedEmbedUrl({id: 1}, undefined)).toEqual(emptyUrl)
  expect(formattedEmbedUrl({id: 1}, {url: '', embedType: ''})).toEqual(emptyUrl)
  expect(formattedEmbedUrl({id: 1}, {})).toEqual(emptyUrl)
});

test('util/formattedEmbedDescription with no step id', () => {
  expect(typeof formattedEmbedDescription).toBe('function');
  expect(formattedEmbedDescription({}, 'test')).toBe('test')
});

test('util/formattedEmbedDescription empty description with no step id', () => {
  expect(typeof formattedEmbedUrl).toBe('function');
  expect(formattedEmbedDescription({}, '')).toEqual(undefined)
  expect(formattedEmbedDescription({}, undefined)).toEqual(undefined)
});

test('util/formattedEmbedDescription with step id', () => {
  expect(typeof formattedEmbedDescription).toBe('function');
  expect(formattedEmbedDescription({id: 1}, 'test')).toBe('test')
});

test('util/formattedEmbedDescription empty description with step id', () => {
  expect(typeof formattedEmbedUrl).toBe('function');
  expect(formattedEmbedDescription({id: 1}, '')).toEqual('')
  expect(formattedEmbedDescription({id: 1}, undefined)).toEqual('')
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
