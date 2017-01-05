/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape'; import React from 'react';
import { shallow } from 'enzyme';

import { translatedLearningPath } from '../../common/__tests__/translatedMockData';
import { LearningPath } from '../LearningPath';

const Foo = () => <div />;
const Bar = () => <div />;

test('component/LearningPath', (t) => {
  t.equal(
    shallow(
      <LearningPath learningPath={translatedLearningPath} params={{}} location={{ pathname: '' }}>
        <Foo />
      </LearningPath>, { context: { lang: 'nb' } }
    ).find(Foo).length, 2, 'renders props.children'); // For some reason cloning an element results in two rendered components

  t.equal(
    shallow(
      <LearningPath
        learningPath={translatedLearningPath} params={{}} location={{ pathname: '' }} main={React.createElement(Bar)}
        saveButtons={React.createElement(Foo)}
      />, { context: { lang: 'nb' } }
    ).find(Foo).length, 1, 'renders props.saveButtons');

  t.equal(
    shallow(
      <LearningPath
        learningPath={translatedLearningPath} params={{}} location={{ pathname: '' }}
        main={React.createElement(Foo)}
      />, { context: { lang: 'nb' } }
    ).find(Foo).length, 1, 'renders props.main');

  t.equal(
    shallow(
      <LearningPath
        learningPath={translatedLearningPath} params={{}} location={{ pathname: '' }} main={React.createElement(Bar)}
        sortLearningSteps={React.createElement(Foo)}
      />, { context: { lang: 'nb' } }
    ).find(Foo).length, 1, 'renders props.sortLearningSteps');

  t.end();
});
