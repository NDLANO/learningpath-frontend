/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { learningPath } from '../../common/__tests__/mockData';
import { getI18nLearningPath } from '../learningPathSelectors';
import { translatedLearningPath } from '../../common/__tests__/translatedMockData';

test('selectors/getI18nLearningPath', (t) => {
  const state = {
    learningPath,
    locale: 'nb',
  };

  t.deepEqual(
    getI18nLearningPath(state),
    translatedLearningPath,
    'translate learningpath correctly'
  );
  t.end();
});
