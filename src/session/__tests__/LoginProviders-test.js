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
  const component = shallow(<LoginProviders />);

  const links = component.find('.cta-link');

  t.equals(links.length, 3);

  t.deepEquals(links.map(n => n.text()), ['Google', 'Facebook', 'Twitter']);

  links.map(n => n.prop('href')).forEach((href) => {
    t.ok(/successUrl=/.test(href), 'successUrl param');
    t.ok(/failureUrl=/.test(href), 'failureUrl param');
  });

  t.end();
});

test('component/LoginProviders with message', (t) => {
  const component = shallow(<LoginProviders message="A message to you, rudy" />);

  t.ok(component.findWhere(n => n.text() === 'A message to you, rudy').length, 'has message');

  t.end();
});
