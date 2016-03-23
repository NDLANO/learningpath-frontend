import tape from 'tape';
import React from 'react';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Alerts } from '../Alerts';
import { clearMessages } from '../../actions';

const test = addAssertions(tape, jsxAssertions);

test('component/Alerts default severity', t => {
  let alertMessages = [{message: 'Testmessage'}];
  const elements = shallow(<Alerts messages={alertMessages} dispatch={{}} />);

  const listElements = elements.find('li');
  const infoElement = elements.find('.alert--info');
  const dangerElement = elements.find('.alert--danger');

  t.equals(listElements.length, 1);
  t.equals(infoElement.length, 1);
  t.equals(dangerElement.length, 0);
  t.end();
});

test('component/Alerts info severity', t => {
  let alertMessages = [{message: 'Testmessage', severity: 'success'}];
  const elements = shallow(<Alerts messages={alertMessages} dispatch={{}} />);

  const listElements = elements.find('li');
  const infoElement = elements.find('.alert--success');

  t.equals(listElements.length, 1);
  t.equals(infoElement.length, 1);
  t.end();

});

test('component/Alerts info and danger severity', t => {
  let alertMessages = [{message: 'Testmessage', severity: 'info'}, {message: 'Testmessage', severity: 'danger'}];
  const elements = shallow(<Alerts messages={alertMessages} dispatch={{}} />);

  const listElements = elements.find('li');
  const dangerElement = elements.find('.alert--danger');
  const infoElement = elements.find('.alert--info');

  t.equals(listElements.length, 2);
  t.equals(dangerElement.html(), infoElement.html());
  t.end();
});

test('component/Alerts dismiss', t => {
  const dispatch = sinon.spy(() => {});

  const dismissBt = shallow(<Alerts messages={[{message: 'whatever', severity: 'info'}]}
      dispatch={dispatch} />).find('.alert_dismiss');

  dismissBt.simulate('click');

  t.ok(dispatch.calledOnce);
  t.deepEquals(dispatch.firstCall.args, [ clearMessages() ]);

  t.end();
});
