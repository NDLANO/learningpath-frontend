import tape from 'tape';
import React from 'react';
import { Link } from 'react-router';
import TestUtils from 'react-addons-test-utils';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';

const test = addAssertions(tape, jsxAssertions);

import { Masthead } from '../Masthead';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Masthead {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}


test('containers/Masthead default', t => {
  const { output } = setup({authenticated: false, userName: '' });
  t.ok(output, 'renders');

  t.jsxIncludes(output, <Link to='/login' className='site-nav_link'>Logg inn</Link>, 'login link');
  t.jsxNotIncludes(output, 'Logg ut', 'logout button');
  t.jsxNotIncludes(output, <Link to='/minside' className='site-nav_link'>Min læringsstier</Link>, 'my page link');

  t.end();
});

test('containers/Masthead logged in', t => {
  const { output } = setup({authenticated: true, userName: 'Alice' });
  t.ok(output, 'renders');

  t.jsxIncludes(output, 'Alice', 'user name');
  t.jsxIncludes(output, 'Logg ut', 'logout button');
  t.jsxIncludes(output, <Link to='/minside' className='site-nav_link'>Min læringsstier</Link>, 'my page link');
  t.jsxNotIncludes(output, <Link to='/login' className='site-nav_link'>Logg inn</Link>, 'login link');

  t.end();
});
