import tape from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';

const test = addAssertions(tape, jsxAssertions);

import { learningStep } from './mockData';
import { LearningPathStep } from '../LearningPathStep';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<LearningPathStep {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}

test('component/LearningPathStep', t => {
  const { output } = setup({lang: 'nb', step: learningStep});
  t.ok(output, 'renders');

  t.jsxIncludes(output, 'En annen tittel her', 'title');
  t.jsxIncludes(output, 'Beskrivelse', 'description');

  t.end();
});
