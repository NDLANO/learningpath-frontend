/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import config, { getEnvironmentVariabel } from '../config';

const url = `https://ndla.eu.auth0.com/oauth/token`;

export const getToken = (audience = 'ndla_system') =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: `${getEnvironmentVariabel('NDLA_LEARNING_PATH_CLIENT_ID')}`,
      client_secret: `${getEnvironmentVariabel(
        'NDLA_LEARNING_PATH_CLIENT_SECRET',
      )}`,
      audience,
    }),
    json: true,
  }).then(res => res.json());

export const getUsers = (managementToken, ownerIds) => {
  const query = ownerIds
    .split(',')
    .map(ownerId => `app_metadata.ndla_id:"${ownerId}"`)
    .join(' OR ');
  return fetch(`${config.auth0Api}users?q=${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${managementToken.access_token}`,
    },
    json: true,
  }).then(res => res.json());
};
