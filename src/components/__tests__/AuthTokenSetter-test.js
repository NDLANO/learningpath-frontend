import test from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import { replacePath } from 'redux-simple-router';

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
    t.ok(dispatch.calledTwice);
    t.equals(typeof dispatch.firstCall.args[0], 'function', 'authenticationSuccess thunk');
    t.deepEquals(dispatch.secondCall.args[0], replacePath('/minside'));

    t.end();
  }).catch((reason) => t.fail(reason));
});

test('component/AuthTokenSetter without authToken', t => {
  const dispatch = sinon.spy(() => Promise.resolve());

  setup({dispatch, params: {}});

  t.notOk(dispatch.called);
  t.end();
});

