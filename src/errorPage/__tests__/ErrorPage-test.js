/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ErrorPage from '../ErrorPage';
import configureStore from '../../configureStore';

jest.mock('../../config', () => ({
  zendeskWidgetKey: '123',
}));

test('ErrorPage renderers correctly', () => {
  const store = configureStore({ locale: 'nb' });
  const component = renderer.create(
    <Provider store={store} locale="nb">
      <StaticRouter>
        <ErrorPage locale="nb" />
      </StaticRouter>
    </Provider>,
  );

  expect(component.toJSON()).toMatchSnapshot();
});
