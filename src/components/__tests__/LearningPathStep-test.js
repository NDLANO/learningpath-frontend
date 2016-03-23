import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from './mockData';
import { LearningPathStep } from '../LearningPathStep';

test('component/LearningPathStep', t => {
  const component = shallow(<LearningPathStep step={learningStep} />,
      {context: {lang:'nb'}});

  const iframe = component.find('iframe');
  t.equal(iframe.prop('src'), learningStep.embedUrl[0].url);

  t.end();
});
