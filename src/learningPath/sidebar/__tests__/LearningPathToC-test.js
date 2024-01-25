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
import { translatedLearningPath } from "../../../common/__tests__/translatedMockData";
import { LearningPathToC } from "../LearningPathToC";
import LearningPathToCStep from "../LearningPathToCStep";

test("component/LearningPathToC", () => {
  const component = shallow(<LearningPathToC learningPath={translatedLearningPath} localCloseSidebars={noop} />, {
    context: { lang: "nb" },
  });

  const steps = component.find(LearningPathToCStep);

  expect(steps.length).toBe(2);
});
