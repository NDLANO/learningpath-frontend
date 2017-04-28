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

import { SiteNav } from '../SiteNav';

test('component/SiteNav not authenticated', () => {
  const navLinks = shallow(<SiteNav authenticated={false} />).find(Link);

  expect(navLinks.length).toBe(2);

  expect(navLinks.at(0).props().to).toBe('/learningpaths');
  expect(navLinks.at(1).props().to).toBe('/login');
});

test('component/SiteNav authenticated', () => {
  const navLinks = shallow(<SiteNav authenticated userName="Alice" />).find(Link);

  expect(navLinks.length).toBe(3);

  expect(navLinks.at(0).props().to).toBe('/learningpaths');
  expect(navLinks.at(1).props().to).toBe('/minside');
  expect(navLinks.at(2).props().to).toBe('/logout');
});
