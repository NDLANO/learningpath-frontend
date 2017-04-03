/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LoginProviders from './LoginProviders';
import LoginFailure from './LoginFailure';
import SessionInitializer from './SessionInitializer';

export default (
  <Route path="login(/)">
    <IndexRoute component={LoginProviders} />
    <Route path="success" component={SessionInitializer} />
    <Route path="failure(/)" component={LoginFailure} />
  </Route>
);
