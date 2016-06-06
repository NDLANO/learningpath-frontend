import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import { learningPath } from '../../__tests__/mockData';
import { LearningPathToC } from '../LearningPathToC';

test('component/LearningPathToC', t => {
  const component = shallow(<LearningPathToC learningPath={learningPath} />,
      {context: { lang: 'nb' }});

  const links = component.find(Link);

  t.equal(links.length, 2, 'has two links');

  t.ok(links.at(0).is('.step-nav_link'), 'link 1 is nav_link');
  t.equal(links.at(0).prop('to'), '/learningpaths/4/step/7');

  t.ok(links.at(1).is('.step-nav_link'), 'link 2 is nav_link');
  t.equal(links.at(1).prop('to'), '/learningpaths/4/step/8');

  t.end();
});
