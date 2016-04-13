import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import sinon from 'sinon';

import { learningPaths } from './mockData';
import { LearningPathDropdown } from '../LearningPathDropdown';

test('component/LearningPathDropdown remove', t => {
  const dispatch = sinon.spy(() => {});
  const component = shallow(<LearningPathDropdown learningPath={learningPaths[0]}
                                    dispatch={dispatch} />,
    {context: {lang:'nb'}});

  component.find('.dropdown-item').last().find('a').simulate('click');

  t.ok(dispatch.calledOnce);

  t.end();
});

test('component/LearningPathDropdown (de)publish', t => {
  const dispatch = sinon.spy(() => {});
  const component = shallow(<LearningPathDropdown learningPath={learningPaths[0]}
                                                  dispatch={dispatch} />,
    {context: {lang:'nb'}});

  component.find('.dropdown-item').first().find('a').simulate('click');

  t.ok(dispatch.calledOnce);

  t.end();
});
