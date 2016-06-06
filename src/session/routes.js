import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LoginProviders from './LoginProviders';
import LoginFailure from './LoginFailure';
import SessionInitializer from './SessionInitializer';

export default (
  <Route path="login(/)">
    <IndexRoute component={LoginProviders} />
    <Route path="success/:authToken(/)" component={SessionInitializer} />
    <Route path="failure(/)" component={LoginFailure} />
  </Route>
);
