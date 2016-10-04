/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from '../../../common/__tests__/mockData';

import LearningPathStepIcon from '../LearningPathStepIcon';

test('component/LearningPathStepIcon', (t) => {
  const component = shallow(<LearningPathStepIcon learningPathStep={learningStep} isCircle />);

  const iconNode = component.find('.step-nav_circle');

  t.equal(iconNode.length, 1, 'one icon node');

  t.end();
});
