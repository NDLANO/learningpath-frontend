/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import queryString from "query-string";
import LinkPager from "../pager/LinkPager";
import { getRange, stepNumbers } from "../pager/PagerUtil";

test("component/PagerUtil.getRange", () => {
  expect(getRange(1, 5)).toEqual([1, 5], "1,5");
  expect(getRange(2, 5)).toEqual([1, 5], "1,5");
  expect(getRange(3, 5)).toEqual([1, 5], "1,5");

  expect(getRange(4, 10)).toEqual([2, 6], "4,10");
  expect(getRange(22, 23)).toEqual([19, 23], "22,23");
  expect(getRange(23, 23)).toEqual([19, 23], "22,23");

  expect(getRange(1, 1)).toEqual([1, 1], "1,1");
  expect(getRange(2, 3)).toEqual([1, 3], "2,3");
  expect(getRange(3, 3)).toEqual([1, 3], "3,3");
});

test("component/PagerUtil.stepNumbers", () => {
  expect(stepNumbers(1, 10)).toEqual([1, 2, 3, 4, 5], "1,10");
  expect(stepNumbers(2, 10)).toEqual([1, 2, 3, 4, 5], "2,10");
  expect(stepNumbers(3, 10)).toEqual([1, 2, 3, 4, 5], "3,10");
  expect(stepNumbers(4, 10)).toEqual([2, 3, 4, 5, 6], "4,10");
  expect(stepNumbers(5, 10)).toEqual([3, 4, 5, 6, 7], "5,10");

  expect(stepNumbers(1, 5)).toEqual([1, 2, 3, 4, 5], "1,5");
  expect(stepNumbers(2, 5)).toEqual([1, 2, 3, 4, 5], "2,5");
  expect(stepNumbers(3, 5)).toEqual([1, 2, 3, 4, 5], "3,5");
  expect(stepNumbers(4, 5)).toEqual([1, 2, 3, 4, 5], "4,5");
  expect(stepNumbers(5, 5)).toEqual([1, 2, 3, 4, 5], "5,5");

  expect(stepNumbers(1, 1)).toEqual([1]);
  expect(stepNumbers(2, 2)).toEqual([1, 2]);
  expect(stepNumbers(3, 3)).toEqual([1, 2, 3]);
  expect(stepNumbers(4, 4)).toEqual([1, 2, 3, 4]);
  expect(stepNumbers(5, 5)).toEqual([1, 2, 3, 4, 5]);
});

function pagerTest({ setup, expected }) {
  test(`component/LinkPager page ${setup.page}/${setup.lastPage}`, () => {
    const steps = shallow(<LinkPager query={{}} {...setup} />).find(".search-stepper_step");

    const prev = setup.page - 1;
    const next = setup.page + 1;

    expect(steps.length).toBe(expected.length);

    expected.forEach((value, i) => {
      // const n = i + 1;
      const step = steps.at(i);

      switch (value) {
        case "current":
          expect(step.is(".search-stepper_step--active")).toBeTruthy();
          expect(step.text()).toBe(setup.page.toString());
          expect(step.is(Link)).toBeFalsy();
          break;
        case "back":
          expect(step.is("Link.search-stepper_step--back")).toBeTruthy();
          expect(parseInt(queryString.parse(step.props().to.search).page, 10)).toBe(prev);
          break;
        case "forward":
          expect(step.is("Link.search-stepper_step--forward")).toBeTruthy();
          expect(parseInt(queryString.parse(step.props().to.search).page, 10)).toBe(next);
          break;
        default:
          expect(step.is(Link)).toBeTruthy();
          expect(parseInt(queryString.parse(step.props().to.search).page, 10)).toBe(value);
          expect(step.props().children).toBe(value);
      }
    });
  });
}

pagerTest({
  setup: { page: 1, lastPage: 1 },
  expected: ["current"],
});

pagerTest({
  setup: { page: 3, lastPage: 5 },
  expected: ["back", 1, 2, "current", 4, 5, "forward"],
});

pagerTest({
  setup: { page: 1, lastPage: 5 },
  expected: ["current", 2, 3, 4, 5, "forward"],
});

pagerTest({
  setup: { page: 19, lastPage: 19 },
  expected: ["back", 15, 16, 17, 18, "current"],
});

pagerTest({
  setup: { page: 4, lastPage: 10 },
  expected: ["back", 2, 3, "current", 5, 6, "forward"],
});
