/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { bindActionCreators } from "redux";
import { matchPath } from "react-router-dom";
import { serverRoutes } from "../serverRoutes";

export default function prefetchData(req, dispatch) {
  const promises = [];
  serverRoutes.forEach((route) => {
    const match = matchPath(req.url, route);
    if (match && route.component.fetchData) {
      promises.push(
        route.component.fetchData({
          match,
          location: { search: req.query },
          ...bindActionCreators(route.component.mapDispatchToProps, dispatch),
        }),
      );
    }
    return match;
  });
  return Promise.all(promises);
}
