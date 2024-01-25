/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from "flux-standard-action";
import { setLearningPathStep } from "../learningPathStepActions";

test("actions/setLearningPathStep", () => {
  const actual = setLearningPathStep({ id: "12345" });

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe("SET_LEARNING_PATH_STEP");
  expect(actual.payload).toBeTruthy();
  expect(actual.payload).toEqual({ id: "12345" });
  expect(actual.error).toBeFalsy();
});

test("actions/setLearningPathStep with error", () => {
  const actual = setLearningPathStep(new Error("fail!"));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe("SET_LEARNING_PATH_STEP");
  expect(actual.payload.message).toBe("fail!");
  expect(actual.error).toBeTruthy();
});
