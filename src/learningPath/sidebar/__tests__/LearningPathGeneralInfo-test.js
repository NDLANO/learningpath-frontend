/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { translatedLearningPath } from '../../../common/__tests__/translatedMockData';
import { learningPath } from '../../../common/__tests__/mockData';
import LearningPathGeneralInfo from '../LearningPathGeneralInfo';
import enzymeAdapter from '../../../common/__tests__/enzymeAdapter';

enzymeAdapter();
const Foo = () => <div />;
const Bar = () => <div />;

const middleware = [thunk];
const mockStore = configureStore(middleware);
test('component/LearningPathGeneralInfo', () => {
  expect(shallow(
    <LearningPathGeneralInfo
      learningPath={translatedLearningPath} onCopyLearningPathClick={noop} addStepButton={React.createElement(Bar)}
      changeStatusButton={React.createElement(Foo)} store={mockStore({ learningPath, authenticated: true, localCloseSidebars: noop })}
    />, { context: { lang: 'nb' } }
).dive().find(Foo).length).toBe(1);
});
