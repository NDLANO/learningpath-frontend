/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import defined from "defined";
import config from "../config";

const NDLA_API_URL = config.ndlaApiUrl;
const AUTH0_DOMAIN = config.auth0Domain;
const NDLA_PERSONAL_CLIENT_ID = config.ndlaPersonalClientId;

/* if (process.env.NODE_ENV === 'unittest') {
  global.__SERVER__ = false; //eslint-disable-line
} */

export const locationOrigin = (() => {
  if (process.env.NODE_ENV === "unittest") {
    return "http://ndla-frontend";
  }

  if (process.env.BUILD_TARGET === "server") {
    return "";
  }

  if (typeof window.location.origin === "undefined") {
    window.location.origin = [window.location.protocol, "//", window.location.host, ":", window.location.port].join("");
  }

  return window.location.origin;
})();

export const ndlaPersonalClientId = (() => {
  if (process.env.NODE_ENV === "unittest") {
    return "123456789";
  }
  return NDLA_PERSONAL_CLIENT_ID;
})();

export const auth0Domain = (() => {
  if (process.env.NODE_ENV === "unittest") {
    return "http://auth-ndla";
  }
  return AUTH0_DOMAIN;
})();

export const apiBaseUrl = (() => {
  if (process.env.NODE_ENV === "unittest") {
    return "http://ndla-api";
  }

  return defined(NDLA_API_URL, locationOrigin);
})();
