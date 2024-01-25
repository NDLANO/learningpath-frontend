/**
 * iCopyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import { matchPath } from "react-router-dom";
import App from "../../main/App";
import config from "../../config";
import configureStore from "../../configureStore";
import { serverRoutes } from "../serverRoutes";
import prefetchData from "../helpers/prefetchData";
import { getLocaleInfoFromPath } from "../../locale/configureLocale";
import { renderHtml, renderPage } from "../helpers/render";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); //eslint-disable-line

const getAssets = () => ({
  css: assets.client.css ? assets.client.css : undefined,
  js: assets.client.js ? [{ src: assets.client.js }] : [],
  polyfill: { src: assets.polyfill.js },
});

async function doRender(req, res) {
  const { locale, basepath, basename } = getLocaleInfoFromPath(req.path);

  // const locale = getHtmlLang(paths[1]);
  const match = serverRoutes.find((r) => matchPath(basepath, r));
  // eslint-disable-next-line no-underscore-dangle

  if (config.disableSSR || match.notFound) {
    const { html, ...docProps } = renderPage("", getAssets(), {
      locale,
    });
    return {
      html,
      docProps,
      context: {},
    };
  }

  const store = configureStore({ locale });
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
