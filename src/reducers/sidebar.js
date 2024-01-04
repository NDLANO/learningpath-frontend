/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from "redux-actions";

const initalState = {
  isRightSidebarOpen: false,
  isLeftSideBarOpen: false,
};

export default handleActions(
  {
    OPEN_LEFT_SIDEBAR: {
      next() {
        return {
          isRightSidebarOpen: false,
          isLeftSideBarOpen: true,
        };
      },
    },
    OPEN_RIGHT_SIDEBAR: {
      next() {
        return {
          isRightSidebarOpen: true,
          isLeftSideBarOpen: false,
        };
      },
    },
    CLOSE_SIDEBARS: {
      next() {
        return initalState;
      },
    },
  },
  initalState,
);
