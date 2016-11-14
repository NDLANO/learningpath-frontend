/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import React, { Component, PropTypes } from 'react';
import { shallow, mount, render } from 'enzyme';
import './jsdomEnv';

import { locationOrigin, defaultApiKey } from '../../sources/helpers';

class Selfie extends Component {
  componentDidMount() {
  }

  render() {
    return <div className="selfie-content">{this.props.foo}</div>;
  }
}

Selfie.propTypes = { foo: PropTypes.string };
Selfie.defaultProps = { foo: 'default bar' };


test('components/TestSetup selftest', (tt) => {
  tt.test('- unit test mocking', (t) => {
    t.equal(locationOrigin, 'http://ndla-frontend');
    t.equal(defaultApiKey, 'ndlatestapikey');
    t.end();
  });

  tt.test('- Enzyme shallow rendering', (t) => {
    t.doesNotThrow(() => shallow(<Selfie />));
    t.end();
  });

  tt.test('- Enzyme full dom rendering', (t) => {
    t.doesNotThrow(() => mount(<Selfie />));
    t.end();
  });

  tt.test('- Enzyme static rendering', (t) => {
    t.doesNotThrow(() => render(<Selfie />));
    t.end();
  });
});
