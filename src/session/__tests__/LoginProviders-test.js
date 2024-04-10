/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import { shallow } from "enzyme";
import LoginProviders from "../LoginProviders";

test("component/LoginProviders", () => {
  const component = shallow(<LoginProviders match={{ url: "" }} />);

  const buttons = component.find(".cta-link");

  expect(buttons.length).toBe(1);

  expect(buttons.map((n) => n.text())).toEqual(["Google"]);
});
