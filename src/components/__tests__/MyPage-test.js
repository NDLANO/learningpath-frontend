import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import { learningPaths } from './mockData';
import { MyPage, mapStateToProps } from '../MyPage';


test('component/MyPage', t => {
  const noop = () => {};

  const requiredProps = {
    setSortKey: noop,
    createPath: noop,
    deletePath: noop,
    updatePathStatus: noop
  };

  const component = shallow(<MyPage {...requiredProps} learningPaths={learningPaths} />,
      {context: {lang: 'nb'}});

  const links = component.find('.tile_bd').find(Link);

  t.deepEqual(links.map(n => n.prop('to')), [
    '/learningpaths/1/first-step',
    '/learningpaths/2/first-step'
  ]);

  t.deepEqual(links.find('.tile_title').map(n => n.prop('children')), [
    'Hva er kunst og kultur?',
    'Leselighet og skrift'
  ]);

  t.end();
});

test('component/MyPage mapStateToProps', t => {
  t.ok(mapStateToProps instanceof Function);

  const state = {
    lang: 'nb',
    learningPaths,
    myLearningPathsSortOrder: 'title'
  };

  let actual = mapStateToProps(state);

  t.ok(actual.learningPaths instanceof Array);
  t.equal(actual.lang, state.lang);
  t.equal(actual.sortKey, 'title');
  t.deepEqual(actual.learningPaths.map(d => d.id), ['1', '2']);


  t.ok(learningPaths[0].lastUpdated < learningPaths[1].lastUpdated, 'self-test');

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
