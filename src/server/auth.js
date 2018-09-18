/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import { getEnvironmentVariabel } from '../config';

const url = `https://ndla.eu.auth0.com/oauth/token`;

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

export async function getToken() {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: getEnvironmentVariabel('NDLA_LEARNING_PATH_CLIENT_ID'),
      client_secret: getClientSecret(),
      audience: 'ndla_system',
    }),
    json: true,
  });
  return response.json();
}
