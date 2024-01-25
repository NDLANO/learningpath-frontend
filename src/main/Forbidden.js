/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import { Link } from "react-router-dom";
import { HelmetWithTracker } from "@ndla/tracker";
import polyglot from "../i18n";

export default function Forbidden() {
  return (
    <div className="status-response_container">
      <HelmetWithTracker title={polyglot.t("htmlTitles.forbidden")} />
      <h2>403: {polyglot.t("htmlStatus.forbidden.description")}</h2>
      <Link to="/" className="cta-link--primary">
        {polyglot.t("htmlStatus.backToFrontpage")}
      </Link>
    </div>
  );
}
