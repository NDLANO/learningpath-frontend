import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningPath } from '../../components/__tests__/mockData';
import { LearningPath } from '../LearningPath';

const Foo = () => <div></div>;
const Bar = () => <div></div>;

test('component/LearningPath', t => {
  t.equal(
    shallow(
      <LearningPath learningPath={learningPath} params={{}}>
        <Foo />
      </LearningPath>, {context: {lang: 'nb'}}
    ).contains(Foo), true, 'renders props.children');

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}} main={React.createElement(Bar)}
        saveButtons={React.createElement(Foo)}
      />, {context: {lang: 'nb'}}
    ).find(Foo).length, 1, 'renders props.saveButtons');

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}}
        main={React.createElement(Foo)}
      />, {context: {lang: 'nb'}}
    ).find(Foo).length, 1, 'renders props.main');

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}} main={React.createElement(Bar)}
        sortLearningSteps={React.createElement(Foo)}
      />, {context: {lang: 'nb'}}
    ).find(Foo).length, 1, 'renders props.sortLearningSteps');

  t.end();
});
