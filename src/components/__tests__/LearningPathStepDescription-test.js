import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from './mockData';

import { LearningPathStepDescription } from '../LearningPathStepDescription';

test('component/LearningPathStepDescription', t => {
  const component = shallow(<LearningPathStepDescription stepTitle={learningStep.title[0].title} stepDescription={learningStep.description[0].description} />);

  let titleNode = component.find('.learning-step_title');

  t.equal(titleNode.length, 1, 'one title node');
  t.equal(titleNode.text(), 'En annen tittel her');

  let bodyNode = component.find('.learning-step_bd');
  t.equal(bodyNode.length, 1, 'one body node');
  t.deepEqual(bodyNode.prop('dangerouslySetInnerHTML'), {__html: learningStep.description[0].description});

  t.end();
});
