/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import { SiteNav } from '../SiteNav';

test('component/SiteNav not authenticated', (t) => {
  const navLinks = shallow(<SiteNav authenticated={false} />).find(Link);

  t.equals(navLinks.length, 2, 'two links');

  t.equals(navLinks.at(0).props().to, '/learningpaths');
  t.equals(navLinks.at(1).props().to, '/login');

  t.end();
});

test('component/SiteNav authenticated', (t) => {
  const navLinks = shallow(<SiteNav authenticated userName="Alice" />).find(Link);

  t.equals(navLinks.length, 3, 'three links');

  t.equals(navLinks.at(0).props().to, '/learningpaths');
  t.equals(navLinks.at(1).props().to, '/minside');
  t.equals(navLinks.at(2).props().to, '/logout');

  t.end();
});
