/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import defined from "defined";
import { OK, MOVED_PERMANENTLY } from "http-status";
import Helmet from "react-helmet";
import { extractCritical } from "emotion-server";
import Document from "./Document";
import config from "../../config";

export function renderPage(Page, assets, state = {}) {
  const { html, ids, css } = extractCritical(renderToString(Page));
  const helmet = Helmet.renderStatic();
  return {
    html,
    helmet,
    assets,
    state,
    css,
    data: {
      ids,
      config,
    },
  };
}

export async function renderHtml(req, html, context, props) {
  const doc = renderToStaticMarkup(<Document {...props} />);

  if (context.url) {
    return {
      status: context.status || MOVED_PERMANENTLY,
      data: {
        Location: context.url,
      },
    };
  }

  const status = defined(context.status, OK);

  return {
    status,
    data: `<!doctype html>${doc.replace("REPLACE_ME", html)}`,
  };
}
