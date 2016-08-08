import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LoginProviders from '../LoginProviders';
import requireAuthentication from '../requireAuthentication';

const mockStore = configureStore([thunk]);


function Whatever() {
  return <div className="whatever">whatever</div>;
}


test('component/requireAuthentication', t => {
  t.doesNotThrow(() => {
    const root = mount(
      React.createElement(
        Provider, { store: mockStore({ authenticated: true }) },
        React.createElement(requireAuthentication(Whatever))
      )
    );

    t.equal(root.find('.whatever').length, 1);
  });
  t.end();
});

test('component/requireAuthentication not authenticated', t => {
  t.doesNotThrow(() => {
    const root = mount(
      React.createElement(
        Provider, { store: mockStore({ authenticated: false }) },
        React.createElement(requireAuthentication(Whatever))
      )
    );

    t.equal(root.find('.whatever').length, 0);

    const providers = root.find(LoginProviders);

    t.equal(providers.length, 1, 'has login provider');
    t.ok(providers.props().message, 'has message');
  });

  t.end();
});
