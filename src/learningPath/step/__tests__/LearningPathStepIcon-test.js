/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';

import { translatedLearningStep } from '../../../common/__tests__/translatedMockData';

import LearningPathStepIcon from '../LearningPathStepIcon';

test('component/LearningPathStepIcon', () => {
  const component = shallow(<LearningPathStepIcon learningPathStep={translatedLearningStep} isCircle />);

  const iconNode = component.find('.step-nav_circle');

  expect(iconNode.length).toBe(1);
});
