/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import polyglot from "../i18n";

class LTIEmbedded extends React.Component {
  componentDidMount() {
    if (window.location.search) {
      const params = window.location.search
        .substr(1)
        .split("&")
        .map((param) => param.split("="))
        .reduce((obj, cur) => {
          const newObj = obj;
          const cur1 = cur[1];
          newObj[cur[0]] = cur1;
          return newObj;
        }, {});
      const obj = { params, type: "ltiParams" };
      window.parent.postMessage(obj, window.location.href);
    }
  }

  render() {
    return (
      <div className="embed-search_form-filters">
        <p>{polyglot.t("ltiSearch.ltiAdded")}</p>
      </div>
    );
  }
}

export default LTIEmbedded;
