/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from "reselect";
import { convertFieldWithFallback } from "../util/convertFieldWithFallback";
import { sortPaths } from "../util/sortUtil";

const getLearningPathsFromState = (state) => state.learningPaths;
export const getSortKey = (state) => state.myLearningPathsSortOrder || "title";

export const getLearningPaths = createSelector([getLearningPathsFromState, getSortKey], (learningPaths, sortKey) => {
  const newLearningPaths = learningPaths.map((learningPath) => ({
    ...learningPath,
    title: convertFieldWithFallback(learningPath, "title", ""),
    description: convertFieldWithFallback(learningPath, "description", ""),
    introduction: convertFieldWithFallback(learningPath, "introduction", ""),
    tags: convertFieldWithFallback(learningPath, "tags", []),
  }));
  return sortPaths(newLearningPaths, sortKey);
});
