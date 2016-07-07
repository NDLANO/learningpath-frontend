import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from '../../../common/__tests__/mockData';

import LearningPathStepIcon from '../LearningPathStepIcon';

test('component/LearningPathStepIcon', t => {
  const component = shallow(<LearningPathStepIcon learningPathStep={learningStep} isCircle />);

  const iconNode = component.find('.step-nav_circle');

  t.equal(iconNode.length, 1, 'one icon node');

  t.end();
});
