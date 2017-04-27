/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';

import { translatedLearningPath } from '../../common/__tests__/translatedMockData';
import { LearningPath } from '../LearningPath';

const Foo = () => <div />;
const Bar = () => <div />;

test('component/LearningPath', () => {
  expect(shallow(
    <LearningPath learningPath={translatedLearningPath} params={{}} location={{ pathname: '' }}>
      <Foo />
    </LearningPath>, { context: { lang: 'nb' } }
  ).find(Foo).length).toBe(2); // For some reason cloning an element results in two rendered components

  expect(shallow(
    <LearningPath
      learningPath={translatedLearningPath} params={{}} location={{ pathname: '' }}
      main={React.createElement(Foo)}
    />, { context: { lang: 'nb' } }
  ).find(Foo).length).toBe(1);

  expect(shallow(
    <LearningPath
      learningPath={translatedLearningPath} params={{}} location={{ pathname: '' }} main={React.createElement(Bar)}
      sortLearningSteps={React.createElement(Foo)}
    />, { context: { lang: 'nb' } }
  ).find(Foo).length).toBe(1);
});
