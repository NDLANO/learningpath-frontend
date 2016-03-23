import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import LoginProviders from '../LoginProviders';


test('component/LoginProviders', t => {
  const component = shallow(<LoginProviders />);

  const links = component.find('.cta-link');

  t.equals(links.length, 3);

  t.deepEquals(links.map(n => n.text()), ['Google', 'Facebook', 'Twitter']);

  links.map(n => n.prop('href')).forEach(href => {
    t.ok(/successUrl=/.test(href), `successUrl param in ${href}`);
    t.ok(/failureUrl=/.test(href), `failureUrl param in ${href}`);
  });

  t.end();
});
