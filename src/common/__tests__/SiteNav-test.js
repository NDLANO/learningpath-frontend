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
import noop from "lodash/noop";
import { SiteNav } from "../siteNav/SiteNav";
import SiteNavSessionAction from "../siteNav/SiteNavSessionAction";
import SiteNavMyPage from "../siteNav/SiteNavMyPage";

test("component/SiteNav learningpaths", () => {
  const navLinks = shallow(<SiteNav authenticated={false} localCloseSidebars={noop} isAdmin={false} />).find(Link);
  expect(navLinks.length).toBe(2);
  expect(navLinks.at(0).props().to).toEqual({
    pathname: "/minside",
    search: "?openModal=true",
  });
  expect(navLinks.at(1).props().to).toBe("/learningpaths");
});

test("component/SiteNavSessionAction not authenticated", () => {
  const navLinks = shallow(<SiteNavSessionAction authenticated={false} localCloseSidebars={noop} />).find(Link);
  expect(navLinks.length).toBe(1);
  expect(navLinks.at(0).props().to).toBe("/login");
});

test("component/SiteNavSessionAction authenticated", () => {
  const navLinks = shallow(<SiteNavSessionAction authenticated localCloseSidebars={noop} />).find(Link);
  expect(navLinks.length).toBe(1);
  expect(navLinks.at(0).props().to).toBe("/logout");
});

test("component/SiteNavMyPage not authenticated", () => {
  const navLinks = shallow(<SiteNavMyPage authenticated={false} localCloseSidebars={noop} />).find(Link);
  expect(navLinks.length).toBe(0);
});

test("component/SiteNavMyPage authenticated", () => {
  const navLinks = shallow(<SiteNavMyPage authenticated localCloseSidebars={noop} />).find(Link);
  expect(navLinks.length).toBe(1);
  expect(navLinks.at(0).props().to).toBe("/minside");
});
