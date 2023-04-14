/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { mount } from 'enzyme';
import {
  translatedLearningStep,
  translatedNdlaLearningStep,
} from '../../../../common/__tests__/translatedMockData';

import Oembed from '../Oembed';

let component;

afterEach(() => {
  component.unmount();
});

// TODO: Check why addEventListener is called six times and not one.
test('component/Oembed', () => {
  const { oembed } = translatedLearningStep;
  component = mount(<Oembed oembedContent={oembed} />);
  const div = component.find('.learning-step');

  expect(div.length).toBe(1);
  expect(div.is('.learning-step--without-dimensions')).toBeFalsy();
  expect(div.prop('dangerouslySetInnerHTML')).toEqual({ __html: oembed.html });

  expect(component.state('isNDLAResource')).toBeFalsy();
});

test('component/Oembed ndla resource', () => {
  const { oembed } = translatedNdlaLearningStep;
  component = mount(<Oembed oembedContent={oembed} />);

  const div = component.find('.learning-step');

  expect(div.length).toBe(1);
  expect(div.is('.learning-step--without-dimensions')).toBeTruthy();
  expect(div.prop('dangerouslySetInnerHTML')).toEqual({ __html: oembed.html });

  expect(component.state('isNDLAResource')).toBeTruthy();
});
