/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import Masthead from '../common/Masthead';
import { Wrapper, OneColumn } from '../common/Layout';
import { DefaultErrorMessage } from './DefaultErrorMessage';

const ErrorPage = () => (
  <Wrapper>
    <OneColumn>
      <DefaultErrorMessage />
    </OneColumn>
  </Wrapper>
);
export default ErrorPage;
