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
import LoginProviders from '../LoginProviders';


test('component/LoginProviders', (t) => {
  const component = shallow(<LoginProviders match={{ url: '' }} />);

  const buttons = component.find('.cta-link');

  t.equals(buttons.length, 3);

  t.deepEquals(buttons.map(n => n.text()), ['Google', 'Facebook', 'Twitter']);

  t.end();
});

test('component/LoginProviders with message', (t) => {
  const component = shallow(<LoginProviders message="A message to you, rudy" match={{ url: '' }} />);

  t.ok(component.findWhere(n => n.text() === 'A message to you, rudy').length, 'has message');

  t.end();
});
