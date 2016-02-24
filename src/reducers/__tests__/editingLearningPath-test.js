import test from 'tape';

import reducer from '../editingLearningPath';

const payload = { id: '123' };

test('reducers/editingLearningPath', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '{}',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_EDITING_LEARNING_PATH', payload }),
    {id: '123'},
    'set state'
  );

  t.deepEqual(
    reducer({id: 'abc'}, { type: 'SET_EDITING_LEARNING_PATH', payload }),
    {id: '123'},
    'change state'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      { type: 'DO_NOT_SET_EDITING_LEARNING_PATH', payload }),
    {id: 'abc'},
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      { type: 'SET_EDITING_LEARNING_PATH', payload: new Error('fail'), error: true }),
    {id: 'abc'},
    'ignore errors'
  );

  t.deepEqual(
    reducer({id: 'abc'}, { type: 'LOGOUT' }),
    {},
    'logout'
  );

  t.end();
});

test('reducers/editingLearningPath create new step', (t) => {
  let nextState = reducer({learningsteps: []}, { type: 'CREATE_NEW_EDITING_LEARNING_PATH_STEP' });

  t.deepEqual(nextState.learningsteps,
    [{
      seqNo: 1,
      title: [],
      description: [],
      embedUrl: [],
      type: '',
      license: ''
    }],
    'add first');
 
  nextState = reducer(nextState, { type: 'CREATE_NEW_EDITING_LEARNING_PATH_STEP' });

  t.equal(nextState.learningsteps.length, 2, 'add second length');

  t.deepEqual(nextState.learningsteps,
    [{
      seqNo: 1,
      title: [],
      description: [],
      embedUrl: [],
      type: '',
      license: ''
    }, {
      seqNo: 2,
      title: [],
      description: [],
      embedUrl: [],
      type: '',
      license: ''
    }],
    'add second');

  t.deepEqual(
    reducer({learningsteps: ['hello']},
      { type: 'CREATE_NEW_EDITING_LEARNING_PATH_STEP', payload: new Error('fail'), error: true }),
    {learningsteps: ['hello']},
    'ignore errors'
  );
  t.end();
});

