import test from 'tape';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { routerActions } from 'react-router-redux';

import { SessionInitializer } from '../SessionInitializer';

function renderComponent(props = {}) {
  return shallow(<SessionInitializer {...props} />);
}


test('component/SessionInitializer', t => {
  const p = Promise.resolve();

  const dispatch = sinon.spy(() => p);

  const params = { authToken: '12345' };

  renderComponent({dispatch, params});

  p.then(() => {
    t.equals(dispatch.callCount, 2, 'called twice');
    // TODO better test for initializeSession thunk
    t.equals(typeof dispatch.firstCall.args[0], 'function', 'initializeSession thunk');
    t.deepEquals(dispatch.secondCall.args[0], routerActions.replace('/minside'));

    t.end();
  }).catch((reason) => {
    t.fail(reason);
    t.end();
  });
});

test('component/SessionInitializer without authToken', t => {
  const dispatch = sinon.spy(() => Promise.resolve());

  renderComponent({dispatch, params: {}});

  t.notOk(dispatch.called);
  t.end();
});
