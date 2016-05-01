import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import { learningPaths } from './mockData';
import { MyPage, mapStateToProps } from '../MyPage';

test('component/MyPage', t => {
  const component = shallow(<MyPage learningPaths={learningPaths}
      setSortKey={()=>{}} />,
      {context: {lang:'nb'}});

  const links = component.find('.tile_hd').find(Link);

  t.deepEqual(links.map(n => n.prop('to')), [
    '/learningpaths/1',
    '/learningpaths/2'
  ]);

  t.deepEqual(links.map(n => n.prop('children')), [
    'Hva er kunst og kultur?',
    'Leselighet og skrift'
  ]);

  t.end();
});

test('component/MyPage mapStateToProps', t => {
  t.ok(mapStateToProps instanceof Function);

  let state = {
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
