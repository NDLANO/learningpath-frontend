/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import { shallow } from "enzyme";
import noop from "lodash/noop";
import { translatedLearningPath } from "../../common/__tests__/translatedMockData";
import { LearningPath } from "../LearningPath";
import SortLearningPathSteps from "../step/sort/SortLearningPathSteps";

test("component/LearningPath", () => {
  expect(
    shallow(
      <LearningPath
        learningPath={translatedLearningPath}
        match={{
          url: `/learningpaths/${translatedLearningPath.id}/step/sort`,
          params: { pathId: translatedLearningPath.id.toString() },
        }}
        location={{ pathname: "" }}
        isTableOfContentOpen={false}
        localFetchLearningPath={noop}
        copyPath={noop}
        pushRoute={noop}
        replaceRoute={noop}
      />,
      { context: { lang: "nb" } },
    ).find(SortLearningPathSteps).length,
  ).toBe(1);
});
