import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import sinon from 'sinon';

import MediaTypeSelect from '../MediaTypeSelect';

test('component/MediaTypeSelect', t => {
  const component = shallow(<MediaTypeSelect onChange={noop} />);

  let inputs = component.find('.icon-select_input');

  t.deepEqual(inputs.map(input => input.prop('value')), 
        ['INTRODUCTION', 'TEXT', 'MULTIMEDIA', 'QUIZ', 'TASK', 'SUMMARY']);

  t.end();
});

test('component/MediaTypeSelect for given value', t => {
  const component = shallow(<MediaTypeSelect value='MULTIMEDIA' onChange={noop} />);

  let inputs = component.find('.icon-select_input');

  t.deepEqual(inputs.reduce((acc, input) =>
      Object.assign(acc, {[input.prop('value')]: input.prop('checked')}), {}),
    {
      INTRODUCTION: false,
      TEXT:         false,
      MULTIMEDIA:   true,
      QUIZ:         false,
      TASK:         false,
      SUMMARY:      false
    }
  );

  t.end();
});

test('component/MediaTypeSelect onChange', t => {
  const onChangeSpy = sinon.spy(()=>{});

  const component = shallow(<MediaTypeSelect onChange={onChangeSpy} />);

  let inputs = component.find('.icon-select_input');

  let inputQuiz = inputs.findWhere(input => input.prop('value') === 'QUIZ');

  inputQuiz.simulate('change', { target: { value: 'QUIZ (FAKE.eventTargetValue)' } });

  t.ok(onChangeSpy.calledOnce, 'onChange called');
  t.equal(onChangeSpy.firstCall.args[0], 'QUIZ (FAKE.eventTargetValue)');

  t.end();
});
