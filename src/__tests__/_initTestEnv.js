/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './raf-polyfill';

/* eslint-disable import/first */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/* eslint-enable import/first */

configure({ adapter: new Adapter() });
