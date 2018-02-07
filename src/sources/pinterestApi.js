/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'isomorphic-fetch';
import { resolveJsonOrRejectWithError } from './helpers';

export const fetchPins = (username, boardName) =>
  fetch(
    `/pinterest-proxy/boards/${username}/${boardName}/pins/?fields=id,link,note,url,original_link`,
  ).then(resolveJsonOrRejectWithError);
