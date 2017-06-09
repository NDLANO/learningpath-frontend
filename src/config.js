/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const environment = process.env.NDLA_ENVIRONMENT || 'test';
const hotjarSite = environment === 'test' ? process.env.HOTJAR_LEARNINGPATH_SITE_ID : undefined;

const activatedForEnvironment = (config, defaultValue) => {
  if (config[environment] !== undefined) {
    return config[environment];
  }
  return defaultValue;
};

const apiDomain = activatedForEnvironment({
  local: 'http://proxy.ndla-local',
  prod: 'https://api.ndla.no',
},
  `https://${environment}.api.ndla.no`);

const ltiActivated = activatedForEnvironment({ test: true, local: true }, false);
const pinterestActivated = activatedForEnvironment({ test: true, local: true }, false);

module.exports = Object.assign({
  componentName: process.env.npm_package_name,
  host: process.env.LEARINGPATH_HOST || 'localhost',
  port: process.env.LEARINGPATH_PORT || '3000',
  redirectPort: process.env.LEARNINGPATH_REDIRECT_PORT || '3001',
  googleTagMangerId: process.env.GOOGLE_TAG_MANGER_ID || undefined,
  hotjarSiteID: hotjarSite || undefined,
  ndlaApiUrl: process.env.NDLA_API_URL || apiDomain,
  ndlaApiKey: process.env.NDLA_API_KEY || 'ndlalearningpathfrontend',
  googleSearchEngineId: process.env.NDLA_GOOGLE_SEARCH_ENGINE_ID,
  googleApiKey: process.env.NDLA_GOOGLE_API_KEY,
  googleApiUrl: process.env.NDLA_GOOGLE_API_URL || 'https://www.googleapis.com',
  logEnvironment: process.env.NDLA_ENVIRONMENT || 'local',
  logglyApiKey: process.env.LOGGLY_API_KEY,
  pinterestApiUrl: process.env.PINTEREST_API_URL || 'https://api.pinterest.com/v1/',
  pinterestEnabled: process.env.PINTEREST_ACCESS_TOKEN !== undefined && pinterestActivated,
  ltiActivated,
  auth0ClientID: process.env.AUTH0_CLIENT_ID || '',
  auth0Domain: process.env.AUTH0_DOMAIN || '',
  disableSSR: process.env.DISABLE_SSR || false,
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
