/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

const ndlaEnvironment = process.env.NDLA_ENVIRONMENT || 'test';

const activatedForEnvironment = (config, defaultValue) => {
  if (config[ndlaEnvironment] !== undefined) {
    return config[ndlaEnvironment];
  }
  return defaultValue;
};

const apiDomain = activatedForEnvironment({
  local: 'http://localhost',
  prod: 'http://api.ndla.no' },
  `http://${ndlaEnvironment}.api.ndla.no`);
const ltiActivated = activatedForEnvironment({ test: true, local: true }, false);
const pinterestActivated = activatedForEnvironment({ test: true, local: true }, false);

module.exports = Object.assign({
  host: process.env.LEARINGPATH_HOST || 'localhost',
  port: process.env.LEARINGPATH_PORT || '3000',
  googleTagMangerId: process.env.GOOGLE_TAG_MANGER_ID || undefined,
  ndlaApiUrl: process.env.NDLA_API_URL || apiDomain,
  ndlaApiKey: process.env.NDLA_API_KEY || 'ndlalearningpathfrontend',
  googleSearchEngineId: process.env.NDLA_GOOGLE_SEARCH_ENGINE_ID,
  googleApiKey: process.env.NDLA_GOOGLE_API_KEY,
  googleApiUrl: process.env.NDLA_GOOGLE_API_URL || 'https://www.googleapis.com',
  pintrestApiUrl: process.env.PINTREST_API_URL || 'https://api.pinterest.com/v1/',
  pintrestEnabled: process.env.PINTREST_ACCESS_TOKEN !== undefined && pinterestActivated,
  ltiActivated,
  app: {
    title: 'NDLA Læringsstier',
    head: {
      meta: [
        { name: 'description', content: 'NDLA Læringsstier meta description' },
        { property: 'og:site_name', content: 'NDLA Læringsstier' },
      ],
    },
  },
}, environment);
