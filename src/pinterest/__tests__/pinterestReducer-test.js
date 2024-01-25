/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from "../pinterestReducer";

const pinsPayload = ["test1", "test2"];

test("reducers/pinterestReducer", () => {
  expect(JSON.stringify(reducer(undefined, {}))).toBe('{"pins":[],"fetchingPins":false}');

  expect(reducer(undefined, { type: "SET_PINS", payload: pinsPayload })).toEqual({
    fetchingPins: false,
    pins: ["test1", "test2"],
  });

  expect(
    reducer({ fetchingPins: false, pins: ["test1", "test3"] }, { type: "SET_PINS", payload: pinsPayload }),
  ).toEqual({ fetchingPins: false, pins: ["test1", "test2"] });

  expect(
    reducer({ fetchingPins: false, pins: ["test1", "test3"] }, { type: "DO_NOT_SET_PINS", payload: pinsPayload }),
  ).toEqual({ fetchingPins: false, pins: ["test1", "test3"] });

  expect(
    reducer(
      { fetchingPins: false, pins: ["test1", "test2"] },
      { type: "SET_PINS", payload: new Error("fail"), error: true },
    ),
  ).toEqual({ fetchingPins: false, pins: ["test1", "test2"] });

  expect(reducer(undefined, { type: "SET_FETCHING_PINS", payload: true })).toEqual({ fetchingPins: true, pins: [] });

  expect(
    reducer({ fetchingPins: true, pins: ["test1", "test3"] }, { type: "SET_FETCHING_PINS", payload: false }),
  ).toEqual({ fetchingPins: false, pins: ["test1", "test3"] });

  expect(
    reducer(
      { fetchingPins: true, pins: ["test1", "test3"] },
      { type: "SET_FETCHING_PINS", payload: new Error("fail"), error: true },
    ),
  ).toEqual({ fetchingPins: true, pins: ["test1", "test3"] });

  expect(reducer(undefined, { type: "REMOVE_PINS", payload: {} })).toEqual({
    fetchingPins: false,
    pins: [],
  });

  expect(reducer({ fetchingPins: true, pins: ["test1", "test3"] }, { type: "REMOVE_PINS", payload: {} })).toEqual({
    fetchingPins: false,
    pins: [],
  });
});
