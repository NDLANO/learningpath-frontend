import tape from 'tape';
import React from 'react';
import { Link } from 'react-router';
import TestUtils from 'react-addons-test-utils';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';

const test = addAssertions(tape, jsxAssertions);

import { learningPaths } from './mockData';
import { MyPage, mapStateToProps } from '../MyPage';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<MyPage {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}


test('component/MyPage', t => {
  const { output } = setup({lang: 'nb', learningPaths});
  t.ok(output, 'renders');

  t.jsxIncludes(output, <Link to='/learningpaths/1'>Hva er kunst og kultur?</Link>, 'link');
  t.jsxIncludes(output, 'Kurset dekker innføring og vil gi deg grunnleggende forståelse', 'description');

  t.jsxIncludes(output, <Link to='/learningpaths/2'>Leselighet og skrift</Link>, 'link');
  t.jsxIncludes(output, 'Uttrykkene "leselighet" og "lesbarhet" brukes om hverandre i norsk fagterminologi', 'description');

  t.jsxIncludes(output, 'PUBLISHED', 'status');
  t.jsxIncludes(output, '18 timer', 'duration');

  t.end();
});

test('component/MyPage without learning paths', t => {
  const { output } = setup({lang: 'nb'});
  t.ok(output, 'renders');
  t.end();
});

test('component/MyPage mapStateToProps', t => {
  t.ok(mapStateToProps instanceof Function);

  let state = {
    lang: 'nb',
    privateLearningPaths: learningPaths,
    privateLearningPathsSortBy: 'title'
  };

  let actual = mapStateToProps(state);

  t.ok(actual.learningPaths instanceof Array);
  t.equal(actual.lang, state.lang);
  t.equal(actual.sortBy, 'title');
  t.deepEqual(actual.learningPaths.map(d => d.id), ['1', '2']);


  t.ok(learningPaths[0].lastUpdated < learningPaths[1].lastUpdated, 'self-test');
  actual = mapStateToProps(Object.assign({},
    state, { privateLearningPathsSortBy: 'lastUpdated' }
  ));

  t.equal(actual.sortBy, 'lastUpdated');
  t.deepEqual(actual.learningPaths.map(d => d.id), ['2', '1']);

  t.end();
});
