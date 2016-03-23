import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Alerts } from '../Alerts';
import { clearMessages } from '../../actions';

const noop = () => {};

test('component/Alerts default severity', t => {
  let alertMessages = [{message: 'Testmessage'}];
  const component = shallow(<Alerts messages={alertMessages} dispatch={noop} />);

  const messageElements = component.find('.alert_msg').find('li');
  t.equals(messageElements.length, 1);
  t.equals(messageElements.text(), 'Testmessage');

  const alertElement = component.find('.alert');
  t.equal(alertElement.prop('className'), 'alert alert--info');

  t.end();
});

test('component/Alerts info severity', t => {
  let messages = ['Testmessage', 'TEST'];
  let alertMessages = [{message: messages[0], severity: 'success'}, {message: messages[1]}];
  const component = shallow(<Alerts messages={alertMessages} dispatch={noop} />);

  const messageElements = component.find('.alert_msg').find('li');
  t.deepEquals(messageElements.map(el => el.text()), messages);

  const alertElement = component.find('.alert');
  t.equal(alertElement.prop('className'), 'alert alert--success');

  t.end();
});

test('component/Alerts info and danger severity', t => {
  let messages = ['Test one', 'Test two'];
  let alertMessages = [{message: messages[0], severity: 'info'}, {message: messages[1], severity: 'danger'}];
  const component = shallow(<Alerts messages={alertMessages} dispatch={noop} />);

  const messageElements = component.find('.alert_msg').find('li');
  t.deepEquals(messageElements.map(el => el.text()), messages);

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

  const dismissBt = shallow(<Alerts messages={[{message: 'whatever', severity: 'info'}]}
      dispatch={dispatch} />).find('.alert_dismiss');

  dismissBt.simulate('click');

  t.ok(dispatch.calledOnce);
  t.deepEquals(dispatch.firstCall.args, [ clearMessages() ]);

  t.end();
});
