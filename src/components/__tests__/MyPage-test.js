import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import sinon from 'sinon';

import { learningPaths } from './mockData';
import { MyPage, mapStateToProps } from '../MyPage';
import deletePrivateLearningPath from "../../actions/deletePrivateLearningPath";

test('component/MyPage', t => {
  const component = shallow(<MyPage learningPaths={learningPaths}
      dispatch={()=>{}} />,
      {context: {lang:'nb'}});

  const links = component.find('.tile_hd').find(Link);

  t.deepEqual(links.map(n => n.prop('to')), [
    '/learningpaths/private/1/edit',
    '/learningpaths/private/2/edit'
  ]);

  t.deepEqual(links.map(n => n.prop('children')), [
    'Hva er kunst og kultur?',
    'Leselighet og skrift'
  ]);

  t.end();
});

test('component/MyPage remove', t => {
  const dispatch = sinon.spy(() => {});
  const component = shallow(<MyPage learningPaths={learningPaths}
    dispatch={dispatch} />,
    {context: {lang:'nb'}});

  component.find('.alert_dismiss').first().simulate('click');

  t.ok(dispatch.calledOnce);
  t.deepEquals(dispatch.firstCall.args, [ deletePrivateLearningPath() ]);

  t.end();
});

test('component/MyPage mapStateToProps', t => {
  t.ok(mapStateToProps instanceof Function);

  let state = {
    lang: 'nb',
    learningPaths,
    privateLearningPathsSortBy: 'title'
  };

  let actual = mapStateToProps(state);

  t.ok(actual.learningPaths instanceof Array);
  t.equal(actual.lang, state.lang);
  t.equal(actual.sortBy, 'title');
  t.deepEqual(actual.learningPaths.map(d => d.id), ['1', '2']);


  t.ok(learningPaths[0].lastUpdated < learningPaths[1].lastUpdated, 'self-test');
  actual = mapStateToProps(Object.assign({},
    state, { privateLearningPathsSortBy: 'lastUpdated' }
  ));

  t.equal(actual.sortBy, 'lastUpdated');
  t.deepEqual(actual.learningPaths.map(d => d.id), ['2', '1']);

  t.end();
});
