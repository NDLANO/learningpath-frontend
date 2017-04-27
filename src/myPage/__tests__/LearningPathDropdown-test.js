/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { learningPaths } from '../../common/__tests__/mockData';
import { LearningPathDropdown } from '../LearningPathDropdown';

const learningPath = learningPaths[0];
const privateLearningPath = Object.assign({}, learningPath, { status: 'PRIVATE' });


test('component/LearningPathDropdown remove', () => {
  const preventDefault = spy();
  const onSelect = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={learningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );

  component.find('.dropdown-menu_item').last().find('button')
           .simulate('click', { preventDefault });

  expect(preventDefault.calledOnce).toBeTruthy();
  expect(onSelect.calledOnce).toBeTruthy();
  expect(onSelect.firstCall.args).toEqual(['delete', learningPath]);
});

test('component/LearningPathDropdown de-publish', () => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={learningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );
  component.find('.dropdown-menu_item').at(1).find('button')
           .simulate('click', { preventDefault });

  expect(preventDefault.calledOnce).toBeTruthy();
  expect(onSelect.calledOnce).toBeTruthy();
  expect(onSelect.firstCall.args).toEqual(['unpublish', learningPath]);
});

test('component/LearningPathDropdown publish', () => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={privateLearningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );

  component.find('.dropdown-menu_item').at(1).find('button')
           .simulate('click', { preventDefault });

  expect(preventDefault.calledOnce).toBeTruthy();
  expect(onSelect.calledOnce).toBeTruthy();
  expect(onSelect.firstCall.args).toEqual(['publish', privateLearningPath]);
});

test('component/LearningPathDropdown make copy', () => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={learningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );
  component.find('.dropdown-menu_item').first().find('button')
           .simulate('click', { preventDefault });

  expect(preventDefault.calledOnce).toBeTruthy();
  expect(onSelect.calledOnce).toBeTruthy();
  expect(onSelect.firstCall.args).toEqual(['makecopy', learningPath]);
});
