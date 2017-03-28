/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import queryString from 'query-string';
import btoa from 'btoa';
import config from '../src/config';

const NDLA_API_URL = config.ndlaApiUrl;

const clientData = {
  grant_type: 'client_credentials',
};
const url = `${NDLA_API_URL}/auth/tokens`;

const b64EncodeUnicode = str => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)));

export const getToken = () => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    Authorization: `Basic ${b64EncodeUnicode(`${process.env.NDLA_LEARNING_PATH_CLIENT_ID}:${process.env.NDLA_LEARNING_PATH_CLIENT_SECRET}`)}`,
  },
  body: queryString.stringify(clientData),
}).then(res => res.json());

export const isTokenExpired = tokenExp => tokenExp - (Date.now() / 1000) <= 0;
