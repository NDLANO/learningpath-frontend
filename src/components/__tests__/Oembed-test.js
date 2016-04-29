import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningStep } from './mockData';
import { ndlaLearningStep } from './mockData';

import Oembed from '../Oembed';

test('component/Oembed', t => {
  let oembed = {url:learningStep.embedContent[0].url, html:learningStep.embedContent[0].html};
  let ndlaOembed = {url:ndlaLearningStep.embedContent[0].url, html:ndlaLearningStep.embedContent[0].html};
  const component = shallow(<Oembed oembedContent={oembed} />);
  const ndlaComponent = shallow(<Oembed oembedContent={ndlaOembed} />);

  t.deepEqual(component.prop('dangerouslySetInnerHTML'), {__html: learningStep.embedContent[0].html});
  t.deepEqual(ndlaComponent.prop('dangerouslySetInnerHTML'), {__html: ndlaLearningStep.embedContent[0].html});
  t.equal(ndlaComponent.prop('className'), 'learning-step learning-step--without-dimensions');
  t.equal(component.prop('className'), 'learning-step');

  t.end();
});
