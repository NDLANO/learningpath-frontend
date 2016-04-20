import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from './mockData';
import { ndlaLearningStep } from './mockData';

import { LearningPathStep } from '../LearningPathStep';

test('component/LearningPathStep', t => {
  const component = shallow(<LearningPathStep step={learningStep} />,
      {context: {lang:'nb'}});
  const ndlaComponent = shallow(<LearningPathStep step={ndlaLearningStep} />,
    {context: {lang:'nb'}});

  t.deepEqual(component.prop('dangerouslySetInnerHTML'), {__html: learningStep.embedContent[0].html});
  t.equal(ndlaComponent.prop('className'), 'learning-step no-defined-height-width');
  t.equal(component.prop('className'), 'learning-step');

  t.end();
});
