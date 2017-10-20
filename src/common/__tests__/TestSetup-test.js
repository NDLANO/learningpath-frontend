/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @jest-environment jsdom
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shallow, mount, render } from 'enzyme';
import { locationOrigin, apiBaseUrl, accessToken } from '../../sources/helpers';

class Selfie extends Component {
  componentDidMount() {
  }

  render() {
    return <div className="selfie-content">{this.props.foo}</div>;
  }
}

Selfie.propTypes = { foo: PropTypes.string };
Selfie.defaultProps = { foo: 'default bar' };

test('components/TestSetup selftest - unit test mocking', () => {
  expect(locationOrigin).toBe('http://ndla-frontend');
  expect(apiBaseUrl).toBe('http://ndla-api');
  expect(accessToken).toBe('ndlatestapikey');
});

test('components/TestSetup selftest - Enzyme shallow rendering', () => {
  expect(() => shallow(<Selfie />)).not.toThrow();
});

test('components/TestSetup selftest - Enzyme full dom rendering', () => {
  expect(() => mount(<Selfie />)).not.toThrow();
});

test('components/TestSetup selftest - Enzyme static rendering', () => {
  expect(() => render(<Selfie />)).not.toThrow();
});
