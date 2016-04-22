import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from './mockData';

import { LearningPathStepDescription } from '../LearningPathStepDescription';

test('component/LearningPathStepDescription', t => {
  const component = shallow(<LearningPathStepDescription learningPathStep={learningStep} />,
      {context: {lang:'nb'}});

  let titleNode = component.find('.learning-step_title');

  t.equal(titleNode.length, 1, 'one title node');
  t.equal(titleNode.text(), 'En annen tittel her');

  let bodyNode = component.find('.learning-step_bd');
  t.equal(bodyNode.length, 1, 'one body node');
  t.equal(bodyNode.render(), '<h1>Beskrivelse</h1>');
  t.deepEqual(component.prop(''), {__html: '<h1>Beskrivelse</h1>'});

  t.end();
});
