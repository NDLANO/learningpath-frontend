/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';

import { translatedLearningPath } from '../../../common/__tests__/translatedMockData';
import LearningPathSummary from '../LearningPathSummary';

test('component/LearningPathSummary', () => {
  const component = shallow(<LearningPathSummary learningPath={translatedLearningPath} lang="nb" />);

  const titleNode = component.find('.learning-path_title');

  expect(titleNode.length).toBe(1);
  expect(titleNode.text()).toBe('Kristofers private bokmål');

  const bodyNode = component.find('.learning-path_bd');
  expect(bodyNode.length).toBe(1);
  expect(bodyNode.text().substring(0, 50)).toBe('Kurset dekker innføring og vil gi deg grunnleggend');
});
