/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import { SiteNav } from '../siteNav/SiteNav';
import { SiteNavSessionAction } from '../siteNav/SiteNavSessionAction';
import { SiteNavMyPage } from '../siteNav/SiteNavMyPage';

test('component/SiteNav learningpaths', () => {
  const navLinks = shallow(<SiteNav authenticated={false} />).find(Link);
  expect(navLinks.length).toBe(1);
  expect(navLinks.at(0).props().to).toBe('/learningpaths');
});

test('component/SiteNavSessionAction not authenticated', () => {
  const navLinks = shallow(<SiteNavSessionAction authenticated={false} />).find(Link);
  expect(navLinks.length).toBe(1);
  expect(navLinks.at(0).props().to).toBe('/login');
});

test('component/SiteNavSessionAction authenticated', () => {
  const navLinks = shallow(<SiteNavSessionAction authenticated />).find(Link);
  expect(navLinks.length).toBe(1);
  expect(navLinks.at(0).props().to).toBe('/logout');
});

test('component/SiteNavMyPage not authenticated', () => {
  const navLinks = shallow(<SiteNavMyPage authenticated={false} />).find(Link);
  expect(navLinks.length).toBe(0);
  expect(navLinks.at(0).props().to).toBe(undefined);
});

test('component/SiteNavMyPage authenticated', () => {
  const navLinks = shallow(<SiteNavMyPage authenticated />).find(Link);
  expect(navLinks.length).toBe(1);
  expect(navLinks.at(0).props().to).toBe('/minside');
});
