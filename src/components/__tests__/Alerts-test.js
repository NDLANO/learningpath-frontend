import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Alerts } from '../Alerts';
import { clearMessages } from '../../actions';

test('component/Alerts default severity', t => {
  let alertMessages = [{message: 'Testmessage'}];
  const elements = shallow(<Alerts messages={alertMessages} dispatch={() => {}} />);

  const listElements = elements.find('li');
  const infoElement = elements.find('.alert--info');
  const dangerElement = elements.find('.alert--danger');

  t.equals(listElements.length, 1);
  t.equals(infoElement.length, 1);
  t.equals(dangerElement.length, 0);
  t.end();
});

test('component/Alerts info severity', t => {
  let messages = ['Testmessage', 'TEST'];
  let alertMessages = [{message: messages[0], severity: 'success'}, {message: messages[1]}];
  const elements = shallow(<Alerts messages={alertMessages} dispatch={() => {}} />);

  const messageList = elements.find('.alert_msg');
  const listElements = messageList.find('li');
  const infoElement = elements.find('.alert--success');

  t.equals(listElements.length, 2);
  for (let i = 0; i < listElements.length; ++i) {
    t.equals(listElements.get(i).props.children, messages[i]);
  }

  t.equals(infoElement.length, 1);
  t.end();
});

test('component/Alerts info and danger severity', t => {
  let messages = ['Test one', 'Test two'];
  let alertMessages = [{message: messages[0], severity: 'info'}, {message: messages[1], severity: 'danger'}];
  const elements = shallow(<Alerts messages={alertMessages} dispatch={() => {}} />);

  const messagesList = elements.find('.alert_msg');
  const listElements = messagesList.find('li');
  const dangerElement = elements.find('.alert--danger');
  const infoElement = elements.find('.alert--info');

  t.equals(listElements.length, 2);
  for (let i = 0; i < listElements.length; ++i) {
    t.equals(listElements.get(i).props.children, messages[i]);
  }

  t.equals(dangerElement.length, 1);
  t.equals(infoElement.length, 0);
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
