import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { learningPaths } from './mockData';
import { LearningPathDropdown } from '../LearningPathDropdown';

const learningPath = learningPaths[0];
const privateLearningPath = Object.assign({}, learningPath, { status: 'PRIVATE' });


test('component/LearningPathDropdown remove', t => {
  const preventDefault = spy();
  const onSelect = spy();

  const component = shallow(
      <LearningPathDropdown learningPath={learningPath} onSelect={onSelect} />,
      {context: {lang:'nb'}});

  component.find('.dropdown-menu_item').last().find('a').simulate('click', { preventDefault });

  t.ok(preventDefault.calledOnce);
  t.ok(onSelect.calledOnce);
  t.deepEqual(onSelect.firstCall.args, ['delete', learningPath]);

  t.end();
});

test('component/LearningPathDropdown de-publish', t => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
      <LearningPathDropdown learningPath={learningPath} onSelect={onSelect} />,
      {context: {lang:'nb'}});

  component.find('.dropdown-menu_item').first().find('a').simulate('click', { preventDefault });

  t.ok(preventDefault.calledOnce);
  t.ok(onSelect.calledOnce);
  t.deepEqual(onSelect.firstCall.args, ['unpublish', learningPath]);

  t.end();
});

test('component/LearningPathDropdown de-publish', t => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
      <LearningPathDropdown learningPath={privateLearningPath} onSelect={onSelect} />,
      {context: {lang:'nb'}});

  component.find('.dropdown-menu_item').first().find('a').simulate('click', { preventDefault });

  t.ok(preventDefault.calledOnce);
  t.ok(onSelect.calledOnce);
  t.deepEqual(onSelect.firstCall.args, ['publish', privateLearningPath]);

  t.end();
});
