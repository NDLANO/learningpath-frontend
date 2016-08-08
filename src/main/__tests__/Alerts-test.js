import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import uuid from 'node-uuid';

import { Alerts } from '../Alerts';
import { clearAllMessages } from '../../messages/messagesActions';

const noop = () => {};

test('component/Alerts default severity', t => {
  let alertMessages = [{ id: uuid.v4(), message: 'Testmessage' }];
  const component = shallow(<Alerts messages={alertMessages} dispatch={noop} />);

  const messageElements = component.find('.alert_msg').find('Message');
  t.equals(messageElements.length, 1);
  // t.equals(messageElements.text(), 'Testmessage');

  const alertElement = component.find('.alert');
  t.equal(alertElement.prop('className'), 'alert alert--info');

  t.end();
});

test('component/Alerts info severity', t => {
  const messages = ['Testmessage', 'TEST'];
  let alertMessages = [{ id: uuid.v4(), message: messages[0], severity: 'success' }, { id: uuid.v4(), message: messages[1] }];
  const component = shallow(<Alerts messages={alertMessages} dispatch={noop} />);

  const messageElements = component.find('.alert_msg').find('Message');
  t.equals(messageElements.length, 2);

  const alertElement = component.find('.alert');
  t.equal(alertElement.prop('className'), 'alert alert--success');

  t.end();
});

test('component/Alerts info and danger severity', t => {
  const messages = ['Test one', 'Test two'];
  let alertMessages = [{ id: uuid.v4(), message: messages[0], severity: 'info' }, { id: uuid.v4(), message: messages[1], severity: 'danger' }];
  const component = shallow(<Alerts messages={alertMessages} dispatch={noop} />);

  const messageElements = component.find('.alert_msg').find('Message');
  t.equals(messageElements.length, 2);

  const alertElement = component.find('.alert');
  t.equal(alertElement.prop('className'), 'alert alert--danger');

  t.end();
});

test('component/Alerts without messages', t => {
  const component = shallow(<Alerts messages={[]} dispatch={noop} />);
  t.ok(component.hasClass('alert-overlay--hidden'));
  t.end();
});

test('component/Alerts dismiss', t => {
  const dispatch = sinon.spy(() => {});

  const dismissBt = shallow(
    <Alerts messages={[{ id: uuid.v4(), message: 'whatever', severity: 'info' }]} dispatch={dispatch} />
  ).find('.alert_dismiss');

  dismissBt.simulate('click');

  t.ok(dispatch.calledOnce);
  t.deepEquals(dispatch.firstCall.args, [clearAllMessages()]);

  t.end();
});
