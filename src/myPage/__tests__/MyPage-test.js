/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import { translatedLearningPaths } from '../../common/__tests__/translatedMockData';
import { learningPaths } from '../../common/__tests__/mockData';
import { MyPage, mapStateToProps } from '../MyPage';
import LearningPathTile from '../../learningPath/tile/LearningPathTile';

test('component/MyPage', () => {
  const noop = () => {};

  const requiredProps = {
    setSortKey: noop,
    createPath: noop,
    deletePath: noop,
    updatePathStatus: noop,
    location: { search: '', pathname: '/minside' },
  };

  const component = shallow(
    <MyPage
      {...requiredProps}
      learningPaths={translatedLearningPaths}
      copyPath={noop}
      locale="nb"
      localFetchMyLearningPaths={noop}
    />,
    { context: { lang: 'nb' } },
  ).dive();
  const tiles = component.find(LearningPathTile);

  expect(tiles).toHaveLength(2);
  expect(tiles.map(n => n.prop('learningPath').title)).toEqual([
    'Hva er kunst og kultur?',
    'Leselighet og skrift',
  ]);
});

test('component/MyPage mapStateToProps', () => {
  expect(mapStateToProps instanceof Function).toBeTruthy();

  const state = {
    lang: 'nb',
    learningPaths,
    myLearningPathsSortOrder: 'title',
  };

  let actual = mapStateToProps(state);

  expect(actual.learningPaths instanceof Array).toBeTruthy();
  expect(actual.lang).toBe(state.lang);
  expect(actual.sortKey).toBe('title');
  expect(actual.learningPaths.map(d => d.id)).toEqual(['1', '2']);

  expect(
    translatedLearningPaths[0].lastUpdated <
      translatedLearningPaths[1].lastUpdated,
  ).toBeTruthy();

  actual = mapStateToProps(
    Object.assign({}, state, { myLearningPathsSortOrder: '-lastUpdated' }),
  );

  expect(actual.sortKey).toBe('-lastUpdated');
  expect(actual.learningPaths.map(d => d.id)).toEqual(['2', '1']);

  actual = mapStateToProps(
    Object.assign({}, state, { myLearningPathsSortOrder: 'lastUpdated' }),
  );

  expect(actual.sortKey).toBe('lastUpdated');
  expect(actual.learningPaths.map(d => d.id)).toEqual(['1', '2']);
});
