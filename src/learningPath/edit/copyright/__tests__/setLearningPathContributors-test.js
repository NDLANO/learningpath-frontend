/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from "flux-standard-action";

import { setLearningPathContributors } from "../learningPathContributorsActions";

test("actions/setLearningPathContributors", () => {
  const actual = setLearningPathContributors([
    { type: "writer", name: "Christian" },
    { type: "writer", name: "Sebastian" },
  ]);

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe("SET_LEARNING_PATH_CONTRIBUTORS");
  expect(actual.payload).toBeTruthy();
  expect(actual.payload).toEqual([
    { type: "writer", name: "Christian" },
    { type: "writer", name: "Sebastian" },
  ]);
  expect(actual.error).toBeFalsy();
});

test("actions/setLearningPathContributors with error", () => {
  const actual = setLearningPathContributors(new Error("fail!"));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe("SET_LEARNING_PATH_CONTRIBUTORS");
  expect(actual.payload.message).toBe("fail!");
  expect(actual.error).toBeTruthy();
});
