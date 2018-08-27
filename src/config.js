/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const getEnvironmentVariabel = (key, fallback = undefined) => {
  const env = 'env';
  const variabel = process[env][key]; // Hack to prevent DefinePlugin replacing process.env
  return variabel || fallback;
};

const environment = getEnvironmentVariabel('NDLA_ENVIRONMENT', 'test');
const hotjarSiteID =
  environment === 'staging'
    ? getEnvironmentVariabel('HOTJAR_LEARNINGPATH_SITE_ID')
    : undefined;

const activatedForEnvironment = (config, defaultValue) => {
  if (config[environment] !== undefined) {
    return config[environment];
  }
  return defaultValue;
};

const ndlaFrontendDomain = activatedForEnvironment(
  {
    local: 'http://api-gateway.ndla-local:30017',
    prod: 'https://ndla.no',
  },
  `https://ndla-frontend.${environment}.api.ndla.no`,
);

const apiDomain = activatedForEnvironment(
  {
    local: 'http://api-gateway.ndla-local',
    prod: 'https://api.ndla.no',
  },
  `https://${environment}.api.ndla.no`,
);

const ltiActivated = activatedForEnvironment(
  { test: true, local: true },
  false,
);
const pinterestActivated = activatedForEnvironment(
  { test: true, local: true },
  false,
);

const gaTrackingId = activatedForEnvironment(
  {
    prod: 'UA-9036010-26',
  },
  `UA-9036010-29`,
);

const config = {
  componentName: getEnvironmentVariabel(
    'npm_package_name',
    'learningpath-frontend',
  ),
  host: getEnvironmentVariabel('LEARINGPATH_HOST', 'localhost'),
  port: getEnvironmentVariabel('LEARINGPATH_PORT', '3000'),
  redirectPort: getEnvironmentVariabel('LEARNINGPATH_REDIRECT_PORT', '3001'),
  googleTagManagerId: getEnvironmentVariabel('NDLA_GOOGLE_TAG_MANAGER_ID'),
  gaTrackingId,
  hotjarSiteID,
  ndlaFrontendDomain,
  ndlaApiUrl: getEnvironmentVariabel('NDLA_API_URL', apiDomain),
  googleSearchEngineId: getEnvironmentVariabel('NDLA_GOOGLE_SEARCH_ENGINE_ID'),
  googleApiKey: getEnvironmentVariabel('NDLA_GOOGLE_API_KEY'),
  googleApiUrl: getEnvironmentVariabel(
    'NDLA_GOOGLE_API_URL',
    'https://www.googleapis.com',
  ),
  logEnvironment: getEnvironmentVariabel('NDLA_ENVIRONMENT', 'local'),
  logglyApiKey: getEnvironmentVariabel('LOGGLY_API_KEY'),
  pinterestApiUrl: getEnvironmentVariabel(
    'PINTEREST_API_URL',
    'https://api.pinterest.com/v1/',
  ),
  pinterestEnabled:
    getEnvironmentVariabel('PINTEREST_ACCESS_TOKEN') !== undefined &&
    pinterestActivated,
  ltiActivated,
  ndlaPersonalClientId: getEnvironmentVariabel('NDLA_PERSONAL_CLIENT_ID', ''),
  auth0Domain: getEnvironmentVariabel('AUTH0_DOMAIN', ''),
  disableSSR: getEnvironmentVariabel('DISABLE_SSR', false),
  zendeskHost: getEnvironmentVariabel('NDLA_ZENDESK_HOST'),
  app: {
    title: 'NDLA Læringsstier',
    head: {
      meta: [{ property: 'og:site_name', content: 'NDLA Læringsstier' }],
    },
  },
  isProduction: getEnvironmentVariabel('NODE_ENV') === 'production',
};

export function getUniversalConfig() {
  return process.env.BUILD_TARGET === 'server' ||
    process.env.NODE_ENV === 'unittest'
    ? config
    : window.config;
}

export default getUniversalConfig();
