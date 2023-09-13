/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const connectSrc = (() => {
  const defaultConnectSrc = [
    "'self'",
    'http://api-gateway.ndla-local',
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'wss://*.zopim.com',
    'https://*.zendesk.com',
    'https://ekr.zdassets.com',
    'https://*.zopim.com',
    'https://*.ndla.no',
    'https://logs-01.loggly.com',
    'https://www.googleapis.com',
    'https://stats.g.doubleclick.net',
    'https://*.clarity.ms',
  ];
  if (process.env.NODE_ENV === 'development') {
    return [
      ...defaultConnectSrc,
      'http://localhost:3001',
      'ws://localhost:3001',
      'http://localhost:3100',
    ];
  }

  return defaultConnectSrc;
})();

const scriptSrc = (() => {
  const defaultScriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'http://api-gateway.ndla-local',
    'https://*.ndla.no',
    'https://*.zendesk.com',
    'https://static.zdassets.com',
    'https://*.zopim.com',
    'https://ndla.no',
    'https://players.brightcove.net',
    'https://www.nrk.no',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://www.youtube.com',
    'https://s.ytimg.com',
    'https://cdn.auth0.com',
    'https://tagmanager.google.com',
    'https://*.clarity.ms',
  ];

  if (process.env.NODE_ENV === 'development') {
    return [...defaultScriptSrc, 'http://localhost:3001'];
  }
  return defaultScriptSrc;
})();

const contentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc,
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://tagmanager.google.com',
    ],
    fontSrc: [
      "'self'",
      'https://*.zopim.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://*.clarity.ms',
      'data:',
    ],
    imgSrc: [
      "'self'",
      'http://api-gateway.ndla-local',
      'https://*.zopim.com',
      'https://*.ndla.no',
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://stats.g.doubleclick.net',
      'https://*.clarity.ms',
      'data: https://i.ytimg.com https://pi.tedcdn.com https://*.ndlap3.seria.net https://*.gstatic.com',
    ],
    connectSrc,
    frameSrc: ['*'],
    childSrc: ['https://*.clarity.ms'],
    objectSrc: ["'none'"],
    reportUri: '/csp-report',
  },
};

export default contentSecurityPolicy;
