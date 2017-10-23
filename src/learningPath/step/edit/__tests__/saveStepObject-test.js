/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { saveStepObject } from '../EditLearningPathStep';

const step = {
  title: 'Old title',
  description: 'Old description',
  someOtherField: 'test',
};

test('util/saveStepObject description and embedUrl', () => {
  const values = {
    title: 'Test',
    description: 'test',
    license: {
      license: 'by-sa',
      description: 'test',
    },
    showTitle: false,
    url: {
      embedType: 'oembed',
      url: 'https://ndla.no/id/3',
    },
  };

  expect(typeof saveStepObject).toBe('function');
  expect(saveStepObject(step, values, 'nb')).toMatchSnapshot();
});

test('util/saveStepObject only description', () => {
  const values = {
    title: 'Test',
    description: 'test',
    license: {
      license: 'by-sa',
      description: 'test',
    },
    showTitle: false,
    url: {
      embedType: 'oembed',
      url: '',
    },
  };

  expect(typeof saveStepObject).toBe('function');
  expect(saveStepObject(step, values, 'nb')).toMatchSnapshot();
});

test('util/saveStepObject only url', () => {
  const values = {
    title: 'Test',
    description: '',
    license: {
      license: 'by-sa',
      description: 'test',
    },
    showTitle: false,
    url: {
      embedType: 'oembed',
      url: 'https://ndla.no/id/3',
    },
  };

  expect(typeof saveStepObject).toBe('function');
  expect(saveStepObject(step, values, 'nb')).toMatchSnapshot();
});
