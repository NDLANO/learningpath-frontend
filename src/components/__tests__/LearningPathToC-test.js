import tape from 'tape';
import React from 'react';
import { Link } from 'react-router';
import TestUtils from 'react-addons-test-utils';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';

const test = addAssertions(tape, jsxAssertions);

import { learningPath } from './mockData';
import LearningPathToC from '../LearningPathToC';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<LearningPathToC {...props} />, {lang: 'nb'});
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}

test('component/LearningPathToC', t => {
  const { output } = setup({learningPath});
  t.ok(output, 'renders');

  t.jsxIncludes(output, <Link to='/learningpaths/4/step/7' className='step-nav_link'>Tittel her</Link>,
      'link to learningstep 1');
  t.jsxIncludes(output, <Link to='/learningpaths/4/step/8' className='step-nav_link'>En annen tittel her</Link>,
      'link to learningpath 2');

  t.end();
});


test('component/LearningPathToC private', t => {
  const { output } = setup({isPrivate: true, learningPath});
  t.ok(output, 'renders');

  t.jsxIncludes(output, <Link to='/learningpaths/private/4/step/7' className='step-nav_link'>Tittel her</Link>,
      'link to learningstep 1');
  t.jsxIncludes(output, <Link to='/learningpaths/private/4/step/8' className='step-nav_link'>En annen tittel her</Link>,
      'link to learningpath 2');

  t.end();
});
