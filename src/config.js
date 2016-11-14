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

const domain = () => {
  switch (process.env.NDLA_ENVIRONMENT) {
    case 'local':
      return 'http://localhost';
    case 'prod':
      return 'http://api.ndla.no';
    default:
      return `http://api.${process.env.NDLA_ENVIRONMENT}.ndla.no`;
  }
};

module.exports = Object.assign({
  host: process.env.LEARINGPATH_HOST || 'localhost',
  port: process.env.LEARINGPATH_PORT || '3000',
  googleTagMangerId: process.env.GOOGLE_TAG_MANGER_ID || undefined,

  ndlaLearningPathApiUrl: process.env.NDLA_LEARNINGPATH_API_URL || domain(),
  ndlaImageApiUrl: process.env.NDLA_IMAGE_API_URL || domain(),
  ndlaOembedProxyUrl: process.env.NDLA_OEMBED_PROXY_URL || domain(),
  ndlaAuthUrl: process.env.NDLA_AUTH_URL || domain(),
  ndlaLearningPathApiKey: process.env.NDLA_LEARNINGPATH_API_KEY || 'ndlalearningpathfrontend',

  googleSearchEngineId: process.env.NDLA_GOOGLE_SEARCH_ENGINE_ID,
  googleApiKey: process.env.NDLA_GOOGLE_API_KEY,
  googleApiUrl: process.env.NDLA_GOOGLE_API_URL || 'https://www.googleapis.com',
  pintrestApiUrl: process.env.PINTREST_API_URL || 'https://api.pinterest.com/v1/',
  pintrestEnabled: process.env.PINTREST_ACCESS_TOKEN !== undefined,
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
