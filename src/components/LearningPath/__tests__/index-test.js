import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { learningPath } from '../../__tests__/mockData';
import { LearningPath } from '..';

const FooBar = () => <div></div>;

test('component/LearningPath', t => {
  t.equal(
    shallow(
      <LearningPath learningPath={learningPath} params={{}}>
        <FooBar />
      </LearningPath>
    ).find(FooBar).length, 1, 'renders props.children');

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}}
        saveButtons={React.createElement(FooBar)}
      />
    ).find(FooBar).length, 1, 'renders props.saveButtons');

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}}
        main={React.createElement(FooBar)}
      />
    ).find(FooBar).length, 1, 'renders props.main');

  t.equal(
    shallow(
      <LearningPath
        learningPath={learningPath} params={{}}
        sortLearningSteps={React.createElement(FooBar)}
      />
    ).find(FooBar).length, 1, 'renders props.sortLearningSteps');

  t.end();
});
