/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';

import reducer, { initialState } from '../learningPathReducer';

const payload = { id: '123', learningsteps: [] };

test('reducers/learningPath', (t) => {
  t.equal(
    reducer(undefined, {}),
    initialState,
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_LEARNING_PATH', payload }),
    { id: '123', learningsteps: [] },
    'set state'
  );

  t.deepEqual(
    reducer({ id: 'abc' }, { type: 'SET_LEARNING_PATH', payload }),
    { id: '123', learningsteps: [] },
    'change state'
  );

  t.deepEqual(
    reducer({ id: 'abc' },
      { type: 'DO_NOT_SET_LEARNING_PATH', payload }),
    { id: 'abc' },
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({ id: 'abc' },
      { type: 'SET_LEARNING_PATH', payload: new Error('fail'), error: true }),
    { id: 'abc' },
    'ignore errors'
  );

  t.end();
});

test('reducers/learningPath update learning step', (t) => {
  let nextState = reducer({ learningsteps: [
    { seqNo: 1, id: 12, license: 'any' },
    { seqNo: 2, id: 34, license: 'public domain' },
    { seqNo: 3, id: 56, license: 'none' },
  ] }, {
    type: 'UPDATE_LEARNING_PATH_STEP',
    payload: {
      seqNo: 2,
      license: 'GPL',
    },
  });

  t.equal(nextState.learningsteps.length, 3);
  t.deepEqual(
    nextState.learningsteps[1],
    {
      seqNo: 2,
      id: 34,
      license: 'GPL',
    }
  );

  nextState = reducer(nextState, {
    type: 'UPDATE_LEARNING_PATH_STEP',
    payload: {
      id: 78,
      seqNo: 4,
      license: 'o_O',
    },
  });

  t.equal(nextState.learningsteps.length, 4);
  t.deepEqual(nextState.learningsteps.map(s => s.id), [12, 34, 56, 78]);

  t.end();
});

test('redurcers/learningPath drag and drop sort learning steps', t => {
  const step1 = { id: 123, title: [{ title: 'testTitle', language: 'nb' }] };
  const step2 = { id: 124, title: [{ title: 'another Title', language: 'nb' }] };
  const step3 = { id: 125, title: [{ title: 'another Title', language: 'nb' }] };

  const nextState1 = reducer({ learningsteps: [step1, step2, step3] }, { type: 'SORT_LEARNING_PATH_STEPS', payload: [] });
  t.deepEqual(
    nextState1.learningsteps,
    [step1, step2, step3],
    'set empty state'
  );

  const nextState2 = reducer({ learningsteps: [step1, step2, step3] }, { type: 'SORT_LEARNING_PATH_STEPS', payload: [step3, step2, step1] });
  t.deepEqual(
    nextState2.learningsteps,
    [step3, step2, step1],
    'change state'
  );

  const nextState3 = reducer({ learningsteps: [] }, { type: 'SORT_LEARNING_PATH_STEPS', payload: [step2, step3, step1] });
  t.deepEqual(
    nextState3.learningsteps,
    [],
    'change state'
  );
  t.end();
});
