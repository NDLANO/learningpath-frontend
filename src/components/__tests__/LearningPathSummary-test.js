import tape from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';

const test = addAssertions(tape, jsxAssertions);

import { learningPath } from './mockData';
import { LearningPathSummary } from '../LearningPathSummary';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<LearningPathSummary {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}

test('component/LearningPathSummary', t => {
  const { output } = setup({lang: 'nb', learningPath});
  t.ok(output, 'renders');

  t.jsxIncludes(output, 'Kristofers private bokmål', 'title');
  t.jsxIncludes(output, 'Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden.', 'description');

  t.end();
});
