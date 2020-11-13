/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import config, { getEnvironmentVariable } from '../../config';

const url = `${config.auth0Url}/oauth/token`;

function getClientSecret() {
  if (getEnvironmentVariable('NOW') === 'true') {
    // We need to base64 encode the secret in now
    const buffer = Buffer.from(
      getEnvironmentVariable('NDLA_LEARNING_PATH_CLIENT_SECRET'),
      'base64',
    );
    return buffer.toString('ascii');
  }
  return getEnvironmentVariable('NDLA_LEARNING_PATH_CLIENT_SECRET');
}

export async function getToken(audience = 'ndla_system') {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: getEnvironmentVariable('NDLA_LEARNING_PATH_CLIENT_ID'),
      client_secret: getClientSecret(),
      audience,
    }),
    json: true,
  });
  return response.json();
}

const chunk = (owners, size) => {
  const chunks = [];
  let index = 0;
  while (index < owners.length) {
    chunks.push(owners.slice(index, size + index));
    index += size;
  }
  return chunks;
};

export const getUsers = async (managementToken, ownerIds) => {
  const owners = ownerIds.split(',');
  const chunks = chunk(owners, 50);

  let requests = [];
  chunks.forEach(chunk => {
    const query = chunk.map(ownerId => `"${ownerId}"`).join('OR');
    const result = fetch(
      `${
        config.auth0Url
      }/api/v2/users?q=app_metadata.ndla_id:(${query})&per_page=50&search-engine=v3&include_totals=true`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${managementToken.access_token}`,
        },
        json: true,
      },
    ).then(res => res.json());
    requests.push(result);
  });
  const results = await Promise.all(requests);
  return results.reduce((acc, res) => [...acc, ...res.users], []);
};
