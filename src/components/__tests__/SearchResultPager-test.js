import tape from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';

const test = addAssertions(tape, jsxAssertions);

import SearchResultPager, { getRange, stepNumbers } from '../SearchResultPager';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<SearchResultPager {...props} query={{}} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}

test('component/SearchResultPager.getRange', t => {
  t.deepEquals(getRange(1,5), [1,5], '1,5');
  t.deepEquals(getRange(2,5), [1,5], '1,5');
  t.deepEquals(getRange(3,5), [1,5], '1,5');

  t.deepEquals(getRange(4,10),  [2,6],   '4,10');
  t.deepEquals(getRange(22,23), [19,23], '22,23');
  t.deepEquals(getRange(23,23), [19,23], '22,23');

  t.deepEquals(getRange(1,1),  [1,1],   '1,1');
  t.deepEquals(getRange(2,3),  [1,3],   '2,3');
  t.deepEquals(getRange(3,3),  [1,3],   '3,3');

  t.end();
});

test('component/SearchResultPager.stepNumbers', t => {
  t.deepEquals(stepNumbers(1, 10), [1,2,3,4,5], '1,10');
  t.deepEquals(stepNumbers(2, 10), [1,2,3,4,5], '2,10');
  t.deepEquals(stepNumbers(3, 10), [1,2,3,4,5], '3,10');
  t.deepEquals(stepNumbers(4, 10), [2,3,4,5,6], '4,10');
  t.deepEquals(stepNumbers(5, 10), [3,4,5,6,7], '5,10');

  t.deepEquals(stepNumbers(1, 5), [1,2,3,4,5], '1,5');
  t.deepEquals(stepNumbers(2, 5), [1,2,3,4,5], '2,5');
  t.deepEquals(stepNumbers(3, 5), [1,2,3,4,5], '3,5');
  t.deepEquals(stepNumbers(4, 5), [1,2,3,4,5], '4,5');
  t.deepEquals(stepNumbers(5, 5), [1,2,3,4,5], '5,5');

  t.deepEquals(stepNumbers(1, 1), [1]);
  t.deepEquals(stepNumbers(2, 2), [1,2]);
  t.deepEquals(stepNumbers(3, 3), [1,2,3]);
  t.deepEquals(stepNumbers(4, 4), [1,2,3,4]);
  t.deepEquals(stepNumbers(5, 5), [1,2,3,4,5]);

  t.end();
});


test('component/SearchResultPager page 1/1', t => {
  let props = { page: 1, lastPage: 1 };
  const { output } = setup(props);
  t.ok(output, 'renders');

  t.jsxIncludes(output, <span className='search-stepper_step search-stepper_step--active'>1</span>, 'current page');
  t.jsxNotIncludes(output, 'search-stepper_step--back', 'back icon');
  t.jsxNotIncludes(output, 'search-stepper_step--forward', 'forward icon');

  t.end();
});

test('component/SearchResultPager page 3/5', t => {
  let props = { page: 3, lastPage: 5 };
  const { output } = setup(props);

  t.jsxIncludes(output, <span className='search-stepper_step search-stepper_step--active'>3</span>, 'current page');
  t.jsxIncludes(output, 'search-stepper_step--back', 'back icon');
  t.jsxIncludes(output, 'search-stepper_step--forward', 'forward icon');
  t.jsxIncludes(output, '1', 'page 1');
  t.jsxIncludes(output, '2', 'page 2');
  t.jsxIncludes(output, '4', 'page 4');
  t.jsxIncludes(output, '5', 'page 5');
  t.jsxNotIncludes(output, '6', 'page 6');

  t.end();
});


test('component/SearchResultPager page 19/19', t => {
  let props = { page: 19, lastPage: 19 };
  const { output } = setup(props);

  t.jsxIncludes(output, <span className='search-stepper_step search-stepper_step--active'>19</span>, 'current page');
  t.jsxIncludes(output, 'search-stepper_step--back', 'back icon');
  t.jsxNotIncludes(output, 'search-stepper_step--forward', 'forward icon');
  t.jsxIncludes(output, '15', 'page 15');
  t.jsxIncludes(output, '16', 'page 16');
  t.jsxIncludes(output, '17', 'page 17');
  t.jsxIncludes(output, '18', 'page 18');
  t.jsxNotIncludes(output, '20', 'page 20');

  t.end();
});

test('component/SearchResultPager page 4/10', t => {
  let props = { page: 4, lastPage: 10 };
  const { output } = setup(props);

  t.jsxIncludes(output, <span className='search-stepper_step search-stepper_step--active'>4</span>, 'current page');
  t.jsxIncludes(output, 'search-stepper_step--back', 'back icon');
  t.jsxIncludes(output, 'search-stepper_step--forward', 'forward icon');
  t.jsxIncludes(output, '2', 'page 2');
  t.jsxIncludes(output, '3', 'page 3');
  t.jsxIncludes(output, '5', 'page 5');
  t.jsxIncludes(output, '6', 'page 6');
  t.jsxNotIncludes(output, '1', 'page 1');

  t.end();
});
