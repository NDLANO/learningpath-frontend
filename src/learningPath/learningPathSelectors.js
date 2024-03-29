/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from "reselect";
import { convertLearningPath } from "./learningPathUtil";
import { convertFieldWithFallback } from "../util/convertFieldWithFallback";

export const getLearningPathFromState = (state) => state.learningPath;

export const getLearningPath = createSelector([getLearningPathFromState], (learningPath) =>
  convertLearningPath(learningPath),
);

export const getLearningPathSteps = createSelector([getLearningPathFromState], (learningPath) => {
  if (learningPath.learningsteps) {
    return learningPath.learningsteps.map((step) => ({
      ...step,
      title: convertFieldWithFallback(step, "title", ""),
    }));
  }
  return [];
});
