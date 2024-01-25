/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { learningPath } from "../../common/__tests__/mockData";
import { getLearningPath, getLearningPathSteps } from "../learningPathSelectors";
import { translatedLearningPath } from "../../common/__tests__/translatedMockData";

test("selectors/getLearningPath", () => {
  const state = {
    learningPath,
    locale: "nb",
  };

  expect(getLearningPath(state)).toEqual(translatedLearningPath);
});

test("selectors/getLearningPathSteps", () => {
  const state = {
    learningPath,
    locale: "nb",
  };
  expect(getLearningPathSteps(state)).toEqual(translatedLearningPath.learningsteps);
});
