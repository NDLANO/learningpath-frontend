import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep, ndlaLearningStep } from './mockData';

import { LearningPathStep } from '../LearningPathStep';


const path = { id: 123 };

test('component/LearningPathStep', t => {
  const component = shallow(<LearningPathStep step={learningStep} path={path} />,
      {context: {lang:'nb'}});

  const sourceContainer = component.find('.learning-step');
  t.equal(sourceContainer.length, 1);

  t.deepEqual(sourceContainer.prop('dangerouslySetInnerHTML'),
      {__html: learningStep.embedContent[0].html});

  t.end();
});

test('component/LearningPathStep with NDLA content', t => {
  const component = shallow(<LearningPathStep step={ndlaLearningStep} path={path} />,
    {context: {lang:'nb'}});

  const sourceContainer = component.find('.learning-step');
  t.ok(sourceContainer.is('.no-defined-height-width'));

  t.end();
});
