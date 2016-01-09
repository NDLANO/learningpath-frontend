import tape from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';

const test = addAssertions(tape, jsxAssertions);

import LoginProviders from './LoginProviders';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<LoginProviders {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}


test('component/LoginProviders', t => {
  const { output } = setup();
  t.ok(output, 'renders');

  ['facebook', 'google', 'twitter'].forEach(provider =>
    t.jsxIncludes(output, `href="/auth/${provider}/login"`, `Link to ${provider} provider`)
  );

  t.end();
});
