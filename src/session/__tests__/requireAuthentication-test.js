/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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


test('component/requireAuthentication', () => {
  expect(() => {
    const root = mount(
      React.createElement(
        Provider, { store: mockStore({ authenticated: true }) },
        React.createElement(requireAuthentication(Whatever))
      )
    );

    expect(root.find('.whatever').length).toBe(1);
  }).not.toThrow();
});

test('component/requireAuthentication not authenticated', () => {
  expect(() => {
    const root = mount(
      React.createElement(
        Provider, { store: mockStore({ authenticated: false }) },
        React.createElement(requireAuthentication(Whatever))
      )
    );

    expect(root.find('.whatever').length).toBe(0);

    const providers = root.find(LoginProviders);

    expect(providers.length).toBe(1);
    expect(providers.props().message).toBeTruthy();
  }).not.toThrow();
});
