/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import useragent from 'useragent';
import config from '../config';
import {
  SvgPolyfillScript,
  SvgPolyfillScriptInitalization,
} from './svgPolyfill';
import Zendesk from './Zendesk';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); //eslint-disable-line

const GoogleTagMangerNoScript = () => {
  if (config.googleTagManagerId) {
    return (
      <noscript>
        <iframe
          title="Google Tag Manager"
          src={`https://www.googletagmanager.com/ns.html?id=${
            config.googleTagManagerId
          }`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    );
  }
  return null;
};

const GoogleTagMangerScript = () => {
  if (config.googleTagManagerId) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${
            config.googleTagManagerId
          }');`,
        }}
      />
    );
  }
  return null;
};

const HotjarScript = () => {
  if (config.hotjarSiteID) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
            h._hjSettings={hjid:${config.hotjarSiteID},hjsv:5};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
    );
  }
  return null;
};

const Html = props => {
  const { lang, className, state, component, userAgentString } = props;
  const content = component ? renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang={lang} className={className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {useragent.parse(userAgentString).family === 'IE' && (
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"
            defer
            async
          />
        )}
        <GoogleTagMangerScript />
        {config.gaTrackingId && (
          <script async src="https://www.google-analytics.com/analytics.js" />
        )}
        <SvgPolyfillScript className={className} />
        {assets.client && assets.client.css && (
          <link rel="stylesheet" type="text/css" href={assets.client.css} />
        )}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic,300|Signika:400,600,300,700"
        />
        <link rel="shortcut icon" href={`/favicon.ico}`} type="image/x-icon" />
      </head>
      <body>
        <GoogleTagMangerNoScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          window.originalLocation = { originalLocation: document.location.protocol + '//' + document.location.hostname + document.location.pathname + document.location.search };
          window.dataLayer.push(window.originalLocation);`,
          }}
        />
        <div
          id="app-container"
          className="app-container"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.initialState = ${serialize(state)}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.config = ${serialize(config)}`,
          }}
        />
        <script
          type="text/javascript"
          src={assets.client.js}
          defer
          crossOrigin={(process.env.NODE_ENV !== 'production').toString()}
        />
        <HotjarScript />
        <Zendesk lang={lang} />
        <SvgPolyfillScriptInitalization className={className} />
      </body>
    </html>
  );
};

Html.propTypes = {
  lang: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  component: PropTypes.node,
  userAgentString: PropTypes.string.isRequired,
};

export default Html;
