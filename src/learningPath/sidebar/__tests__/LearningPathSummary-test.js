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
import noop from 'lodash/noop';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { learningPath } from '../../../common/__tests__/mockData';

import { translatedLearningPath } from '../../../common/__tests__/translatedMockData';
import LearningPathSummary from '../LearningPathSummary';

const middleware = [thunk];
const mockStore = configureStore(middleware);
test('component/LearningPathSummary', (t) => {
  const component = shallow(<LearningPathSummary learningPath={translatedLearningPath} lang="nb" store={mockStore({ learningPath, authenticated: true, localCloseSidebars: noop })} />);

  const titleNode = component.dive().find('.learning-path_title');
  t.equal(titleNode.length, 1, 'one title node');
  t.equal(titleNode.text(), 'Kristofers private bokmål');

  const bodyNode = component.dive().find('.learning-path_bd');
  t.equal(bodyNode.length, 1, 'one body node');
  t.equal(bodyNode.text().substring(0, 50),
     'Kurset dekker innføring og vil gi deg grunnleggend');

  t.end();
});
