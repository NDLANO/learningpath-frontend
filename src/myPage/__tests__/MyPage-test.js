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
import { Link } from 'react-router';

import { translatedLearningPaths } from '../../common/__tests__/translatedMockData';
import { learningPaths } from '../../common/__tests__/mockData';

import { MyPage, mapStateToProps } from '../MyPage';


test('component/MyPage', (t) => {
  const noop = () => {};

  const requiredProps = {
    setSortKey: noop,
    createPath: noop,
    deletePath: noop,
    updatePathStatus: noop,
  };

  const component = shallow(<MyPage {...requiredProps} learningPaths={translatedLearningPaths} />,
      { context: { lang: 'nb' } });

  const links = component.find('.tile_bd').find(Link);

  t.deepEqual(links.map(n => n.prop('to')), [
    '/learningpaths/1/first-step',
    '/learningpaths/2/first-step',
  ]);

  t.deepEqual(links.find('.tile_title').map(n => n.prop('children')), [
    'Hva er kunst og kultur?',
    'Leselighet og skrift',
  ]);

  t.end();
});

test('component/MyPage mapStateToProps', (t) => {
  t.ok(mapStateToProps instanceof Function);

  const state = {
    lang: 'nb',
    learningPaths,
    myLearningPathsSortOrder: 'title',
  };

  let actual = mapStateToProps(state);

  t.ok(actual.learningPaths instanceof Array);
  t.equal(actual.lang, state.lang);
  t.equal(actual.sortKey, 'title');
  t.deepEqual(actual.learningPaths.map(d => d.id), ['1', '2']);


  t.ok(translatedLearningPaths[0].lastUpdated < translatedLearningPaths[1].lastUpdated, 'self-test');

  actual = mapStateToProps(Object.assign({},
    state, { myLearningPathsSortOrder: '-lastUpdated' }
  ));

  t.equal(actual.sortKey, '-lastUpdated');
  t.deepEqual(actual.learningPaths.map(d => d.id), ['2', '1']);

  actual = mapStateToProps(Object.assign({},
    state, { myLearningPathsSortOrder: 'lastUpdated' }
  ));

  t.equal(actual.sortKey, 'lastUpdated');
  t.deepEqual(actual.learningPaths.map(d => d.id), ['1', '2']);

  t.end();
});
