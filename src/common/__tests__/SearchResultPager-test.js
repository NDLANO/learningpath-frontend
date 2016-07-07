import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import LinkPager from '../pager/LinkPager';
import { getRange, stepNumbers } from '../pager/PagerUtil';
test('component/PagerUtil.getRange', t => {
  t.deepEquals(getRange(1, 5), [1, 5], '1,5');
  t.deepEquals(getRange(2, 5), [1, 5], '1,5');
  t.deepEquals(getRange(3, 5), [1, 5], '1,5');

  t.deepEquals(getRange(4, 10), [2, 6], '4,10');
  t.deepEquals(getRange(22, 23), [19, 23], '22,23');
  t.deepEquals(getRange(23, 23), [19, 23], '22,23');

  t.deepEquals(getRange(1, 1), [1, 1], '1,1');
  t.deepEquals(getRange(2, 3), [1, 3], '2,3');
  t.deepEquals(getRange(3, 3), [1, 3], '3,3');

  t.end();
});

test('component/PagerUtil.stepNumbers', t => {
  t.deepEquals(stepNumbers(1, 10), [1, 2, 3, 4, 5], '1,10');
  t.deepEquals(stepNumbers(2, 10), [1, 2, 3, 4, 5], '2,10');
  t.deepEquals(stepNumbers(3, 10), [1, 2, 3, 4, 5], '3,10');
  t.deepEquals(stepNumbers(4, 10), [2, 3, 4, 5, 6], '4,10');
  t.deepEquals(stepNumbers(5, 10), [3, 4, 5, 6, 7], '5,10');

  t.deepEquals(stepNumbers(1, 5), [1, 2, 3, 4, 5], '1,5');
  t.deepEquals(stepNumbers(2, 5), [1, 2, 3, 4, 5], '2,5');
  t.deepEquals(stepNumbers(3, 5), [1, 2, 3, 4, 5], '3,5');
  t.deepEquals(stepNumbers(4, 5), [1, 2, 3, 4, 5], '4,5');
  t.deepEquals(stepNumbers(5, 5), [1, 2, 3, 4, 5], '5,5');

  t.deepEquals(stepNumbers(1, 1), [1]);
  t.deepEquals(stepNumbers(2, 2), [1, 2]);
  t.deepEquals(stepNumbers(3, 3), [1, 2, 3]);
  t.deepEquals(stepNumbers(4, 4), [1, 2, 3, 4]);
  t.deepEquals(stepNumbers(5, 5), [1, 2, 3, 4, 5]);

  t.end();
});


function pagerTest({ setup, expected }) {
  test(`component/LinkPager page ${setup.page}/${setup.lastPage}`, t => {
    const steps = shallow(<LinkPager query={{}} {...setup} />)
      .find('.search-stepper_step');

    const prev = setup.page - 1;
    const next = setup.page + 1;

    t.equal(steps.length, expected.length, 'steppers length');

    expected.forEach((value, i) => {
      const n = i + 1;
      const step = steps.at(i);

      switch (value) {
        case 'current':
          t.ok(step.is('.search-stepper_step--active'), 'Current page active');
          t.equal(step.text(), setup.page.toString(), 'Current page text');
          t.notOk(step.is(Link), 'Current page not linked');
          break;
        case 'back':
          t.ok(step.is('Link.search-stepper_step--back'), 'Back link');
          t.equal(step.props().to.query.page, prev, `Back link links to page ${prev}`);
          break;
        case 'forward':
          t.ok(step.is('Link.search-stepper_step--forward'), 'Forward link');
          t.equal(step.props().to.query.page, next, `Forward link links to page ${next}`);
          break;
        default:
          t.ok(step.is(Link), `stepper ${n} is Link`);
          t.equal(step.props().to.query.page, value, `Stepper ${n} links to page ${value}`);
          t.equal(step.props().children, value, `Stepper ${n} has text ${value}`);
      }
    });

    t.end();
  });
}

pagerTest({
  setup: { page: 1, lastPage: 1 },
  expected: ['current'],
});

pagerTest({
  setup: { page: 3, lastPage: 5 },
  expected: ['back', 1, 2, 'current', 4, 5, 'forward'],
});

pagerTest({
  setup: { page: 1, lastPage: 5 },
  expected: ['current', 2, 3, 4, 5, 'forward'],
});

pagerTest({
  setup: { page: 19, lastPage: 19 },
  expected: ['back', 15, 16, 17, 18, 'current'],
});

pagerTest({
  setup: { page: 4, lastPage: 10 },
  expected: ['back', 2, 3, 'current', 5, 6, 'forward'],
});
