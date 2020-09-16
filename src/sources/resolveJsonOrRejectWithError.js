/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import defined from 'defined';

export function ApiError(message, res = {}, json) {
  this.name = 'ApiError';
  this.message = message;
  this.url = res.url;
  this.status = res.status;
  this.json = json;
  this.code = json.code;
  // Drop creating a stack for easier unit testing
  // The stack does'nt give any value as long as the ApiError is only created in createErrorPayload()
  // this.stack = (new Error()).stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

export function createErrorPayload(res, message, json) {
  return new ApiError(
    `${res.status} ${message} ${json.code} ${json.description}`,
    res,
    json,
  );
}

export function resolveJsonOrRejectWithError(res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return res.status === 204 ? resolve() : resolve(res.json());
    }
    return res
      .json()
      .then(json =>
        createErrorPayload(res, defined(json.message, res.statusText), json),
      )
      .then(reject);
  });
}

export function resolveJsonIgnoreOembedFailureOrRejectWithError(res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return res.status === 204 ? resolve() : resolve(res.json());
    }
    if (res.status === 502) {
      const json = res.json();
      if (json?.startsWith('Received error 404')) {
        // Hack to allow usage of unpublished articles as learningsteps.
        resolve({});
      }
      reject();
    }
    return res
      .json()
      .then(json =>
        createErrorPayload(res, defined(json.message, res.statusText), json),
      )
      .then(reject);
  });
}
