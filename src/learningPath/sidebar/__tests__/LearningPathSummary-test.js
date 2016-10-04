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

import { learningPath } from '../../../common/__tests__/mockData';
import LearningPathSummary from '../LearningPathSummary';

test('component/LearningPathSummary', (t) => {
  const component = shallow(<LearningPathSummary learningPath={learningPath} lang="nb" />);

  const titleNode = component.find('.learning-path_title');

  t.equal(titleNode.length, 1, 'one title node');
  t.equal(titleNode.text(), 'Kristofers private bokmål');

  const bodyNode = component.find('.learning-path_bd');
  t.equal(bodyNode.length, 1, 'one body node');
  t.equal(bodyNode.text().substring(0, 50),
     'Kurset dekker innføring og vil gi deg grunnleggend');

  t.end();
});
