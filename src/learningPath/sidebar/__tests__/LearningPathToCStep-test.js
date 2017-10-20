/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import { Link } from 'react-router-dom';
import { translatedLearningPath, translatedLearningPathNotEditable } from '../../../common/__tests__/translatedMockData';
import LearningPathToCStep from '../LearningPathToCStep';

test('component/LearningPathToCStep first step with no add step button', () => {
  const component = shallow(
    <LearningPathToCStep learningPath={translatedLearningPath} step={translatedLearningPath.learningsteps[0]} steps={translatedLearningPath.learningsteps} activeStepId="" localCloseSidebars={noop} />,
      { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  expect(link.at(0).is('.step-nav_link')).toBeTruthy();

  const item = component.find('.step-nav_item');
  expect(item.at(0).is('.step-nav_item--bottom_border')).toBeTruthy();
});


// (!hasAddStepButton && step !== last(steps))
test('component/LearningPathToCStep last step with no add step button editable', () => {
  const component = shallow(
    <LearningPathToCStep learningPath={translatedLearningPath} step={translatedLearningPath.learningsteps[1]} steps={translatedLearningPath.learningsteps} activeStepId="" localCloseSidebars={noop} />,
      { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  expect(link.at(0).is('.step-nav_link')).toBeTruthy();

  const item = component.find('.step-nav_item');
  expect(item.at(0).is('.step-nav_item--bottom_border')).toBeFalsy();
});

// (hasAddStepButton && learningPath.canEdit)
test('component/LearningPathToCStep last step with add step button editable', () => {
  const component = shallow(
    <LearningPathToCStep
      learningPath={translatedLearningPath}
      step={translatedLearningPath.learningsteps[1]}
      steps={translatedLearningPath.learningsteps}
      activeStepId="" hasAddStepButton
      localCloseSidebars={noop}
    />,
      { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  expect(link.at(0).is('.step-nav_link')).toBeTruthy();

  const item = component.find('.step-nav_item');
  expect(item.at(0).is('.step-nav_item--bottom_border')).toBeFalsy();
});

test('component/LearningPathToCStep last step with add step button not editable', () => {
  const component = shallow(
    <LearningPathToCStep
      learningPath={translatedLearningPathNotEditable}
      step={translatedLearningPathNotEditable.learningsteps[1]}
      steps={translatedLearningPathNotEditable.learningsteps}
      activeStepId=""
      localCloseSidebars={noop}
    />,
    { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  expect(link.at(0).is('.step-nav_link')).toBeTruthy();

  const item = component.find('.step-nav_item');
  expect(item.at(0).is('.step-nav_item--bottom_border')).toBeFalsy();
});

// (step !== last(steps) && !learningPath.canEdit)
test('component/LearningPathToCStep first step with add step button not editable', () => {
  const component = shallow(
    <LearningPathToCStep
      learningPath={translatedLearningPathNotEditable}
      step={translatedLearningPathNotEditable.learningsteps[0]}
      steps={translatedLearningPathNotEditable.learningsteps}
      activeStepId=""
      localCloseSidebars={noop}
    />,
    { context: { lang: 'nb' } }
  );
  const link = component.find(Link);
  expect(link.at(0).is('.step-nav_link')).toBeTruthy();

  const item = component.find('.step-nav_item');
  expect(item.at(0).is('.step-nav_item--bottom_border')).toBeTruthy();
});
