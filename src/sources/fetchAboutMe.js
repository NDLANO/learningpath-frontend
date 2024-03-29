/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchAuthorized } from "./helpers";

const fetchAboutMe = fetchAuthorized("/auth/me");

export default fetchAboutMe;
