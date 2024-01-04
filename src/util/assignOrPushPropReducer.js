/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import assign from "lodash/assign";
import get from "lodash/get";

export default function assignOrPushPropReducer(propertyName) {
  return function next(state, action) {
    const nextState = cloneDeep(state);
    const properties = get(nextState, propertyName, []);
    const index = findIndex(properties, ["language", action.payload.language]);

    if (index === -1) {
      properties.push(action.payload);
    } else {
      assign(properties[index], action.payload);
    }

    nextState[propertyName] = properties;

    return nextState;
  };
}
