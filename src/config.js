/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const getEnvironmentVariable = (key, fallback = undefined) => {
  const env = 'env';
  const variable = process[env][key]; // Hack to prevent DefinePlugin replacing process.env
  return variable || fallback;
};

const environment = getEnvironmentVariable('NDLA_ENVIRONMENT', 'test');

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
  `https://${environment}.ndla.no`,
);

const apiDomain = activatedForEnvironment(
  {
    local: 'http://api-gateway.ndla-local',
    prod: 'https://api.ndla.no',
  },
  `https://api.${environment}.ndla.no`,
);

const ltiActivated = activatedForEnvironment(
  { test: true, local: true },
  false,
);
const pinterestActivated = activatedForEnvironment(
  { test: true, local: true },
  false,
);

const getAuth0Hostname = () => {
  switch (environment) {
    case 'prod':
      return 'ndla.eu.auth0.com';
    default:
      return `ndla-${environment}.eu.auth0.com`;
  }
};

const editorialFrontendDomain = () => {
  switch (environment) {
    case 'local':
      return 'http://localhost:30019';
    case 'prod':
      return 'https://ed.ndla.no';
    default:
      return `https://ed.${environment}.ndla.no`;
  }
};

const config = {
  componentName: getEnvironmentVariable(
    'npm_package_name',
    'learningpath-frontend',
  ),
  environment,
  editorialFrontendDomain: getEnvironmentVariable(
    'EDITORIAL_FRONTEND_DOMAIN',
    editorialFrontendDomain(),
  ),
  host: getEnvironmentVariable('LEARINGPATH_HOST', 'localhost'),
  port: getEnvironmentVariable('LEARINGPATH_PORT', '3000'),
  redirectPort: getEnvironmentVariable('LEARNINGPATH_REDIRECT_PORT', '3001'),
  googleTagManagerId: getEnvironmentVariable('NDLA_GOOGLE_TAG_MANAGER_ID'),
  ndlaFrontendDomain: getEnvironmentVariable(
    'FRONTEND_DOMAIN',
    ndlaFrontendDomain,
  ),
  ndlaApiUrl: getEnvironmentVariable('NDLA_API_URL', apiDomain),
  googleSearchEngineId: getEnvironmentVariable('NDLA_GOOGLE_SEARCH_ENGINE_ID'),
  googleApiUrl: getEnvironmentVariable(
    'NDLA_GOOGLE_API_URL',
    'https://www.googleapis.com',
  ),
  logEnvironment: getEnvironmentVariable('NDLA_ENVIRONMENT', 'local'),
  logglyApiKey: getEnvironmentVariable('LOGGLY_API_KEY'),
  pinterestApiUrl: getEnvironmentVariable(
    'PINTEREST_API_URL',
    'https://api.pinterest.com/v1/',
  ),
  pinterestEnabled:
    getEnvironmentVariable('PINTEREST_ACCESS_TOKEN') !== undefined &&
    pinterestActivated,
  ltiActivated: getEnvironmentVariable('LTI_ACTIVATED', ltiActivated),
  ndlaPersonalClientId: getEnvironmentVariable('NDLA_PERSONAL_CLIENT_ID', ''),
  auth0Domain: getEnvironmentVariable('AUTH0_DOMAIN', getAuth0Hostname()),
  disableSSR: getEnvironmentVariable('DISABLE_SSR', false),
  zendeskWidgetKey: getEnvironmentVariable('NDLA_ZENDESK_WIDGET_KEY'),
  app: {
    title: 'NDLA Læringsstier',
    head: {
      meta: [{ property: 'og:site_name', content: 'NDLA Læringsstier' }],
    },
  },
  matomoUrl: getEnvironmentVariable('MATOMO_URL', 'https://tall.ndla.no/'),
  matomoSiteId: getEnvironmentVariable('MATOMO_SITE_ID', ''),
  isProduction: getEnvironmentVariable('NODE_ENV') === 'production',
  isVercel: getEnvironmentVariable('IS_VERCEL') === 'true',
};

export function getUniversalConfig() {
  return process.env.BUILD_TARGET === 'server' ||
    process.env.NODE_ENV === 'unittest'
    ? config
    : window.DATA.config;
}

export default getUniversalConfig();
