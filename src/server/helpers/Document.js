/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import useragent from 'useragent';
import config from '../../config';
import {
  SvgPolyfillScript,
  SvgPolyfillScriptInitalization,
} from './svgPolyfill';
import { GoogleTagMangerNoScript, GoogleTagMangerScript } from './Gtm';
import HotjarScript from './Hotjar';

const Document = props => {
  const { className, state, userAgentString, assets, css, data } = props;
  const head = Helmet.rewind();
  const { locale } = state;

  return (
    <html lang={locale} className={className}>
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
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        {assets.css &&
          assets.css && (
            <link rel="stylesheet" type="text/css" href={assets.css} />
          )}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic,300|Signika:400,600,300,700"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
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
        <div id="app-container" className="app-container">
          REPLACE_ME
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.initialState = ${serialize(state)}`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.DATA = ${serialize(data)}; `,
          }}
        />
        {assets.js.map(js => (
          <script
            key={js}
            type="text/javascript"
            src={js}
            defer
            crossOrigin={(process.env.NODE_ENV !== 'production').toString()}
          />
        ))}
        <HotjarScript />
        <SvgPolyfillScriptInitalization className={className} />
      </body>
    </html>
  );
};

Document.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  userAgentString: PropTypes.string.isRequired,
  assets: PropTypes.shape({
    css: PropTypes.string,
    js: PropTypes.array.isRequired,
  }).isRequired,
};

export default Document;
