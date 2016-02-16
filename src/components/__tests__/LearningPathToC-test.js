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
  renderer.render(<LearningPathToC {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}

test('component/LearningPathToC', t => {
  const { output } = setup({lang: 'nb', learningPath});
  t.ok(output, 'renders');

  t.jsxIncludes(output, 'Kristofers private bokmål', 'title');
  t.jsxIncludes(output, '02.02.16', 'lastUpdated');
  t.jsxIncludes(output, 'KristoferForfatter', 'author.name');
  t.jsxIncludes(output, '18 timer', 'duration');

  t.jsxIncludes(output, <Link to='/learningpaths/4' className='step-nav_link'>Introduksjon</Link>,
      'link to learningpath');
  t.jsxIncludes(output, <Link to='/learningpaths/4/step/7' className='step-nav_link'>Tittel her</Link>,
      'link to learningstep 1');
  t.jsxIncludes(output, <Link to='/learningpaths/4/step/8' className='step-nav_link'>En annen tittel her</Link>,
      'link to learningpath 2');

  t.end();
});


test('component/LearningPathToC private', t => {
  const { output } = setup({lang: 'nb', isPrivate: true, learningPath});
  t.ok(output, 'renders');

  t.jsxIncludes(output, <Link to='/learningpaths/private/4' className='step-nav_link'>Introduksjon</Link>,
      'link to learningpath');
  t.jsxIncludes(output, <Link to='/learningpaths/private/4/step/7' className='step-nav_link'>Tittel her</Link>,
      'link to learningstep 1');
  t.jsxIncludes(output, <Link to='/learningpaths/private/4/step/8' className='step-nav_link'>En annen tittel her</Link>,
      'link to learningpath 2');

  t.end();
});
