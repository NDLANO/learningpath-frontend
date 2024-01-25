/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { learningPaths } from "../../../common/__tests__/mockData";
import { getLearningPathSearchResult } from "../learningPathSearchSelectors";
import { translatedLearningPaths } from "../../../common/__tests__/translatedMockData";

test("selectors/getLearningPathSearchResult", () => {
  const state = {
    learningPathSearch: {
      results: learningPaths,
    },
    locale: "nb",
  };

  expect(getLearningPathSearchResult(state)).toEqual(translatedLearningPaths);
});
