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
import noop from 'lodash/noop';
import { Link } from 'react-router';
import { learningPath, learningPathNotEditable } from '../../../common/__tests__/translatedMockData';
import LearningPathToCStep from '../LearningPathToCStep';

test('component/LearningPathToCStep first step with no add step button', (t) => {
  const component = shallow(
    <LearningPathToCStep learningPath={learningPath} step={learningPath.learningsteps[0]} steps={learningPath.learningsteps} activeStepId="" localCloseSidebars={noop} />,
      { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  t.ok(link.at(0).is('.step-nav_link'), 'first step link is nav_link');

  const item = component.find('.step-nav_item');
  t.ok(item.at(0).is('.step-nav_item--bottom_border'), 'first step has class step-nav_item--bottom_border');

  t.end();
});


// (!hasAddStepButton && step !== last(steps))
test('component/LearningPathToCStep last step with no add step button editable', (t) => {
  const component = shallow(
    <LearningPathToCStep learningPath={learningPath} step={learningPath.learningsteps[1]} steps={learningPath.learningsteps} activeStepId="" localCloseSidebars={noop} />,
      { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  t.ok(link.at(0).is('.step-nav_link'), 'last step link is nav_link');

  const item = component.find('.step-nav_item');
  t.notOk(item.at(0).is('.step-nav_item--bottom_border'), 'last step link has not class step-nav_item--bottom_border');

  t.end();
});

// (hasAddStepButton && learningPath.canEdit)
test('component/LearningPathToCStep last step with add step button editable', (t) => {
  const component = shallow(
    <LearningPathToCStep learningPath={learningPath} step={learningPath.learningsteps[1]} steps={learningPath.learningsteps} activeStepId="" hasAddStepButton localCloseSidebars={noop} />,
      { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  t.ok(link.at(0).is('.step-nav_link'), 'last step link is nav_link');

  const item = component.find('.step-nav_item');
  t.ok(item.at(0).is('.step-nav_item--bottom_border'), 'last step link has not class step-nav_item--bottom_border');

  t.end();
});

test('component/LearningPathToCStep last step with add step button not editable', (t) => {
  const component = shallow(
    <LearningPathToCStep
      learningPath={learningPathNotEditable} step={learningPathNotEditable.learningsteps[1]} steps={learningPathNotEditable.learningsteps} activeStepId="" hasAddStepButton localCloseSidebars={noop}
    />,
    { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  t.ok(link.at(0).is('.step-nav_link'), 'last step link is nav_link');

  const item = component.find('.step-nav_item');
  t.notOk(item.at(0).is('.step-nav_item--bottom_border'), 'last step link has not class step-nav_item--bottom_border');

  t.end();
});

// (step !== last(steps) && !learningPath.canEdit)
test('component/LearningPathToCStep first step with add step button not editable', (t) => {
  const component = shallow(
    <LearningPathToCStep
      learningPath={learningPathNotEditable} step={learningPathNotEditable.learningsteps[0]} steps={learningPathNotEditable.learningsteps} activeStepId="" hasAddStepButton localCloseSidebars={noop}
    />,
    { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  t.ok(link.at(0).is('.step-nav_link'), 'first step link is nav_link');

  const item = component.find('.step-nav_item');
  t.ok(item.at(0).is('.step-nav_item--bottom_border'), 'first step link has class step-nav_item--bottom_border');

  t.end();
});
