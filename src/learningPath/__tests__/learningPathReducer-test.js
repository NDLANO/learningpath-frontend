/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer, { initialState } from '../learningPathReducer';

const payload = { id: '123', learningsteps: [] };

test('reducers/learningPath', () => {
  expect(reducer(undefined, {})).toBe(initialState);

  expect(reducer(undefined, { type: 'SET_LEARNING_PATH', payload })).toEqual({
    id: '123',
    learningsteps: [],
  });

  expect(
    reducer({ id: 'abc' }, { type: 'SET_LEARNING_PATH', payload }),
  ).toEqual({ id: '123', learningsteps: [] });

  expect(
    reducer({ id: 'abc' }, { type: 'DO_NOT_SET_LEARNING_PATH', payload }),
  ).toEqual({ id: 'abc' });

  expect(
    reducer(
      { id: 'abc' },
      { type: 'SET_LEARNING_PATH', payload: new Error('fail'), error: true },
    ),
  ).toEqual({ id: 'abc' });
});

test('reducers/learningPath update learning step', () => {
  let nextState = reducer(
    {
      learningsteps: [
        { seqNo: 1, id: 12, license: 'any' },
        { seqNo: 2, id: 34, license: 'public domain' },
        { seqNo: 3, id: 56, license: 'none' },
      ],
    },
    {
      type: 'UPDATE_LEARNING_PATH_STEP',
      payload: {
        seqNo: 2,
        license: 'GPL',
      },
    },
  );

  expect(nextState.learningsteps.length).toBe(3);
  expect(nextState.learningsteps[1]).toEqual({
    seqNo: 2,
    id: 34,
    license: 'GPL',
  });

  nextState = reducer(nextState, {
    type: 'UPDATE_LEARNING_PATH_STEP',
    payload: {
      id: 78,
      seqNo: 4,
      license: 'o_O',
    },
  });

  expect(nextState.learningsteps.length).toBe(4);
  expect(nextState.learningsteps.map(s => s.id)).toEqual([12, 34, 56, 78]);
});

test('redurcers/learningPath drag and drop sort learning steps', () => {
  const step1 = { id: 123, title: [{ title: 'testTitle', language: 'nb' }] };
  const step2 = {
    id: 124,
    title: [{ title: 'another Title', language: 'nb' }],
  };
  const step3 = {
    id: 125,
    title: [{ title: 'another Title', language: 'nb' }],
  };

  const nextState1 = reducer(
    { learningsteps: [step1, step2, step3] },
    { type: 'SORT_LEARNING_PATH_STEPS', payload: [] },
  );
  expect(nextState1.learningsteps).toEqual([step1, step2, step3]);

  const nextState2 = reducer(
    { learningsteps: [step1, step2, step3] },
    { type: 'SORT_LEARNING_PATH_STEPS', payload: [step3, step2, step1] },
  );
  expect(nextState2.learningsteps).toEqual([step3, step2, step1]);

  const nextState3 = reducer(
    { learningsteps: [] },
    { type: 'SORT_LEARNING_PATH_STEPS', payload: [step2, step3, step1] },
  );
  expect(nextState3.learningsteps).toEqual([]);
});
