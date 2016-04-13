import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import { CreateLearningPath } from '../CreateLearningPath';

test('component/CreateLearningPath', t => {
  const emptyLearningPath = { title: [], description: [], learningsteps: [] };

  const component = shallow(<CreateLearningPath learningPath={emptyLearningPath} />);

  t.ok(component.hasClass('wtf'), 'is .wtf');

  t.end();
});

