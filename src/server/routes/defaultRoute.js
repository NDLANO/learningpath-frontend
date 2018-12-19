/**
 * iCopyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import App from '../../main/App';
import config from '../../config';
import configureStore from '../../configureStore';
import { serverRoutes } from '../serverRoutes';
import TokenStatusHandler from '../../util/TokenStatusHandler';
import { getTokenExpireAt } from '../../util/jwtHelper';
import prefetchData from '../helpers/prefetchData';
import { getLocaleInfoFromPath } from '../../i18n';
import { renderHtml, renderPage } from '../helpers/render';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); //eslint-disable-line

const getAssets = () => ({
  css: assets.client.css ? assets.client.css : undefined,
  js: assets.client.js ? [assets.client.js] : [],
});

async function doRender(req, res, token) {
  const { locale, basepath, basename } = getLocaleInfoFromPath(req.path);

  // const locale = getHtmlLang(paths[1]);
  const match = serverRoutes.find(r => matchPath(basepath, r));
  // eslint-disable-next-line no-underscore-dangle
  const storedTokenInfo = {
    token: token.access_token,
    expiresAt: getTokenExpireAt(token.access_token),
  };

  if (config.disableSSR || match.notFound) {
    const { html, ...docProps } = renderPage('', getAssets(), {
      accessToken: storedTokenInfo,
      locale,
    });
    return {
      html,
      docProps,
      context: {},
    };
  }

  const store = configureStore({ locale, accessToken: storedTokenInfo });
  TokenStatusHandler.getInstance({ store });
  const context = {};

  const Page = (
    <Provider store={store} locale={locale}>
      <StaticRouter basename={basename} location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  await prefetchData(req, store.dispatch);
  const { html, ...docProps } = renderPage(Page, getAssets(), store.getState());

  return {
    html,
    docProps,
    context,
  };
}

export async function defaultRoute(req, res, token) {
  const { html, context, docProps } = await doRender(req, res, token);
  return renderHtml(req, html, context, docProps);
}
