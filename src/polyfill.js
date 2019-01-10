/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import '@ndla/polyfill';

// Svg use polyfill is not included in @ndla/polyfill since it is only used in learningpath.
// In the future learningpath should use @ndla/icons
import 'svg4everybody';
window.svg4everybody();
