import test from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import { routeActions } from 'redux-simple-router';

import { AuthTokenSetter } from '../AuthTokenSetter';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<AuthTokenSetter {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}


test('component/AuthTokenSetter', t => {
  const p = Promise.resolve();

  const dispatch = sinon.spy(() => p);

  const params = { authToken: '12345' };

  setup({dispatch, params});

  p.then(() => {
    t.equals(dispatch.callCount, 2, 'called twice');
    t.equals(typeof dispatch.firstCall.args[0], 'function', 'initializeSession thunk');
    t.deepEquals(dispatch.secondCall.args[0], routeActions.replace('/minside'));

    t.end();
  }).catch((reason) => {
    t.fail(reason);
    t.end();
  });
});

test('component/AuthTokenSetter without authToken', t => {
  const dispatch = sinon.spy(() => Promise.resolve());

  setup({dispatch, params: {}});

  t.notOk(dispatch.called);
  t.end();
});

