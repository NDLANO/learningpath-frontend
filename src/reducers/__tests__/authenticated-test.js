/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from "../authenticated";

test("reducers/authenticated", () => {
  expect(reducer(undefined, {})).toBe(false);

  expect(reducer(undefined, { type: "SET_AUTHENTICATED", payload: true })).toBe(true);

  expect(reducer(true, { type: "SET_AUTHENTICATED", payload: false })).toBe(false);

  expect(reducer(true, { type: "DO_NOT_SET_AUTHENTICATED", payload: false })).toBe(true);

  expect(
    reducer(true, {
      type: "SET_AUTHENTICATED",
      payload: new Error("foobar"),
      error: true,
    }),
  ).toBe(true);

  expect(reducer(true, { type: "LOGOUT" })).toBe(false);
});
