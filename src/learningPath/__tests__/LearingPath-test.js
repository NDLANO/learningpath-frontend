import test from 'tape'; import React from 'react';
import { shallow } from 'enzyme';

import { learningPath } from '../../common/__tests__/mockData';
import { LearningPath } from '../LearningPath';

const Foo = () => <div />;
const Bar = () => <div />;

test('component/LearningPath', t => {
  t.equal(
    shallow(
      <LearningPath learningPath={learningPath} params={{}}>
        <Foo />
      </LearningPath>, { context: { lang: 'nb' } }
    ).find(Foo).length, 2, 'renders props.children'); // For some reason cloning an element results in two rendered components

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}} main={React.createElement(Bar)}
        saveButtons={React.createElement(Foo)}
      />, { context: { lang: 'nb' } }
    ).find(Foo).length, 1, 'renders props.saveButtons');

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}}
        main={React.createElement(Foo)}
      />, { context: { lang: 'nb' } }
    ).find(Foo).length, 1, 'renders props.main');

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}} main={React.createElement(Bar)}
        sortLearningSteps={React.createElement(Foo)}
      />, { context: { lang: 'nb' } }
    ).find(Foo).length, 1, 'renders props.sortLearningSteps');

  t.end();
});
