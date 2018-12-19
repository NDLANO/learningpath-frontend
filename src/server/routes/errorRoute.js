/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import ErrorPage from '../../errorPage/ErrorPage';
import { getLocaleInfoFromPath } from '../../locale/configureLocale';
import { renderHtml, renderPage } from '../helpers/render';
import configureStore from '../../configureStore';
import { configureLocale } from '../../locale/configureLocale';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); //eslint-disable-line

const getAssets = () => ({
  css: assets.client.css ? assets.client.css : undefined,
  // Error page is a static page, only use js to inject css under development
  js: assets.injectCss ? [assets.injectCss.js] : [],
});

async function doRenderError(req, status = INTERNAL_SERVER_ERROR) {
  const { locale } = getLocaleInfoFromPath(req.path);
  const store = configureStore({ locale });
  configureLocale(locale);
  const context = { status };
  const Page = (
    <Provider store={store} locale={locale}>
      <ErrorPage locale={locale} />
    </Provider>
  );

  const { html, ...docProps } = renderPage(Page, getAssets());

  return {
    html,
    docProps,
    context,
  };
}

export async function errorRoute(req) {
  const { html, context, docProps } = await doRenderError(req);
  return renderHtml(req, html, context, docProps);
}
