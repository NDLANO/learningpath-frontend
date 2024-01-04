/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from "../myLearningPathsSortOrder";

test("reducers/myLearningPathsSortOrder", () => {
  /*
  t.equal(
      JSON.stringify(reducer(undefined, {})),
      'title',
      'empty action on undefined state'
  );
  */

  let actual = reducer(undefined, {
    type: "SET_MY_LEARNING_PATHS_SORT_ORDER",
    payload: "status",
  });
  expect(actual).toBe("status");

  actual = reducer("status", {
    type: "SET_MY_LEARNING_PATHS_SORT_ORDER",
    payload: "title",
  });
  expect(actual).toBe("title");

  actual = reducer("status", {
    type: "DO_NOT_SET_MY_LEARNING_PATHS_SORT_ORDER",
    payload: "title",
  });
  expect(actual).toEqual("status");

  actual = reducer("status", { type: "LOGOUT" });
  expect(actual).toEqual("title");
});
