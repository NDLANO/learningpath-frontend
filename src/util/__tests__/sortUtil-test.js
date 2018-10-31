/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { sortPaths } from '../sortUtil';
import { translatedLearningPaths } from '../../common/__tests__/translatedMockData';

test('util/sortUtil sortPaths', () => {
  expect(sortPaths(translatedLearningPaths, 'status')).toMatchSnapshot();
  expect(sortPaths(translatedLearningPaths, 'title')).toMatchSnapshot();
  expect(sortPaths(translatedLearningPaths, 'lastUpdated')).toMatchSnapshot();
  expect(sortPaths(translatedLearningPaths, '-lastUpdated')).toMatchSnapshot();
  expect(sortPaths(translatedLearningPaths, 'duration')).toMatchSnapshot();
});
