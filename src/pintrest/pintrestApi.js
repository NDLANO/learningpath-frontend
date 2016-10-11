/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'isomorphic-fetch';
import { resolveJsonOrRejectWithError } from '../sources/helpers';

export const fetchPins = boardName => fetch(`/pintrest-proxy/boards/${boardName}/pins/?fields=id%2Clink%2Cnote%2Curl%2Coriginal_link`).then(resolveJsonOrRejectWithError);
