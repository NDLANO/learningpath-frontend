/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { learningPaths } from '../../common/__tests__/mockData';
import { LearningPathDropdown } from '../LearningPathDropdown';

const learningPath = learningPaths[0];
const privateLearningPath = Object.assign({}, learningPath, { status: 'PRIVATE' });


test('component/LearningPathDropdown remove', (t) => {
  const preventDefault = spy();
  const onSelect = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={learningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );

  component.find('.dropdown-menu_item').last().find('button')
           .simulate('click', { preventDefault });

  t.ok(preventDefault.calledOnce);
  t.ok(onSelect.calledOnce);
  t.deepEqual(onSelect.firstCall.args, ['delete', learningPath]);

  t.end();
});

test('component/LearningPathDropdown de-publish', (t) => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={learningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );
  component.find('.dropdown-menu_item').at(1).find('button')
           .simulate('click', { preventDefault });

  t.ok(preventDefault.calledOnce);
  t.ok(onSelect.calledOnce);
  t.deepEqual(onSelect.firstCall.args, ['unpublish', learningPath]);

  t.end();
});

test('component/LearningPathDropdown publish', (t) => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={privateLearningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );

  component.find('.dropdown-menu_item').at(1).find('button')
           .simulate('click', { preventDefault });

  t.ok(preventDefault.calledOnce);
  t.ok(onSelect.calledOnce);
  t.deepEqual(onSelect.firstCall.args, ['publish', privateLearningPath]);

  t.end();
});

test('component/LearningPathDropdown unlist', (t) => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={privateLearningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );

  component.find('.dropdown-menu_item').at(2).find('button')
           .simulate('click', { preventDefault });

  t.ok(preventDefault.calledOnce);
  t.ok(onSelect.calledOnce);
  t.deepEqual(onSelect.firstCall.args, ['unlist', privateLearningPath]);

  t.end();
});

test('component/LearningPathDropdown make copy', (t) => {
  const onSelect = spy();
  const preventDefault = spy();

  const component = shallow(
    <LearningPathDropdown learningPath={learningPath} onSelect={onSelect} />,
    { context: { lang: 'nb' } }
  );
  component.find('.dropdown-menu_item').first().find('button')
           .simulate('click', { preventDefault });

  t.ok(preventDefault.calledOnce);
  t.ok(onSelect.calledOnce);
  t.deepEqual(onSelect.firstCall.args, ['makecopy', learningPath]);

  t.end();
});
