/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { learningPath } from '../../../common/__tests__/translatedMockData';
import { LearningPathToC } from '../LearningPathToC';
import LearningPathToCStep from '../LearningPathToCStep';

test('component/LearningPathToC', (t) => {
  const component = shallow(<LearningPathToC learningPath={learningPath} />,
      { context: { lang: 'nb' } });

  const steps = component.find(LearningPathToCStep);

  t.equal(steps.length, 2, 'has two steps');

  t.end();
});
