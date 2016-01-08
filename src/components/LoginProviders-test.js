import test from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowHelpers from 'react-shallow-renderer-helpers';
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

  const links = shallowHelpers.filterType(output, 'a');
  t.equal(links.length, 2, 'two links');

  t.ok(links.find(link => link.props.href === '/login/facebook'), 'facebook link');
  t.ok(links.find(link => link.props.href === '/login/google'), 'google link');

  t.end();
});
