/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import LoginProviders from '../LoginProviders';


test('component/LoginProviders', () => {
  const component = shallow(<LoginProviders match={{ url: '' }} />);

  const buttons = component.find('.cta-link');

  expect(buttons.length).toBe(2);

  expect(buttons.map(n => n.text())).toEqual(['Google', 'Facebook']);
});

test('component/LoginProviders with message', () => {
  const component = shallow(<LoginProviders message="A message to you, rudy" match={{ url: '' }} />);

  expect(component.findWhere(n => n.text() === 'A message to you, rudy').length).toBeTruthy();
});
