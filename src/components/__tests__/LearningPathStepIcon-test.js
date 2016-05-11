import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from './mockData';

import LearningPathStepIcon from '../LearningPathStepIcon';

test('component/LearningPathStepIcon', t => {
  const component = shallow(<LearningPathStepIcon learningPathStep={learningStep} />);

  let iconNode = component.find('.step-nav_circle');

  t.equal(iconNode, 1, 'one icon node');

  t.end();
});
