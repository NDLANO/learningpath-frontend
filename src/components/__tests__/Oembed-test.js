import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from './mockData';
import { ndlaLearningStep } from './mockData';

import Oembed from '../Oembed';

test('component/Oembed', t => {
  const oembed = learningStep.embedContent[0];
  const component = shallow(<Oembed oembedContent={oembed} />);

  t.deepEqual(component.prop('dangerouslySetInnerHTML'), {__html: oembed.html});
  t.ok(component.is('.learning-step'), 'has class .learning-step');
  t.notOk(component.is('.learning-step--without-dimensions'), 'has not class .learning-step--without-dimensions');

  t.end();
});

test('component/Oembed ndla resource', t => {
  let oembed = ndlaLearningStep.embedContent[0];
  const component = shallow(<Oembed oembedContent={oembed} />);

  t.deepEqual(component.prop('dangerouslySetInnerHTML'), {__html: oembed.html});
  t.ok(component.is('.learning-step'), 'has class .learning-step');
  t.ok(component.is('.learning-step--without-dimensions'), 'has class .learning-step--without-dimensions');

  t.end();
});
