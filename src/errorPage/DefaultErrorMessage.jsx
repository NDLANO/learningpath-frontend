/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import polyglot from "../i18n";

export const DefaultErrorMessage = () => (
  <div className="infoblock-error">
    <img role="presentation" src="/oops.gif" style={{ maxWidth: "100%" }} alt={polyglot.t("errorPage.imageAlt")} />
    <div>
      <h1>{polyglot.t("errorPage.title")}</h1>
      <span>{polyglot.t("errorPage.subTitle")}</span>
    </div>
  </div>
);
