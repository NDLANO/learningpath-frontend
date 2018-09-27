/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import config, { getEnvironmentVariabel } from '../config';

const url = `${config.auth0Url}/oauth/token`;

function getClientSecret() {
  if (getEnvironmentVariabel('NOW') === 'true') {
    // We need to base64 encode the secret in now
    const buffer = Buffer.from(
      getEnvironmentVariabel('NDLA_LEARNING_PATH_CLIENT_SECRET'),
      'base64',
    );
    return buffer.toString('ascii');
  }
  return getEnvironmentVariabel('NDLA_LEARNING_PATH_CLIENT_SECRET');
}

export async function getToken(audience = 'ndla_system') {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: getEnvironmentVariabel('NDLA_LEARNING_PATH_CLIENT_ID'),
      client_secret: getClientSecret(),
      audience,
    }),
    json: true,
  });
  return response.json();
}

export const getUsers = (managementToken, ownerIds) => {
  const query = ownerIds
    .split(',')
    .map(ownerId => `app_metadata.ndla_id:"${ownerId}"`)
    .join(' OR ');

  return fetch(`${config.auth0Url}/api/v2/users?q=${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${managementToken.access_token}`,
    },
    json: true,
  }).then(res => res.json());
};
