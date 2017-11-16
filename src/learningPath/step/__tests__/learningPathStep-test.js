/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from '../learningPathStepReducer';

const payload = { id: '123' };

test('reducers/learningPathStep', () => {
  expect(JSON.stringify(reducer(undefined, {}))).toBe('{}');

  expect(
    reducer(undefined, { type: 'SET_LEARNING_PATH_STEP', payload }),
  ).toEqual({ id: '123' });

  expect(
    reducer({ id: 'abc' }, { type: 'SET_LEARNING_PATH_STEP', payload }),
  ).toEqual({ id: '123' });

  expect(
    reducer({ id: 'abc' }, { type: 'DO_NOT_SET_LEARNING_PATH_STEP', payload }),
  ).toEqual({ id: 'abc' });

  expect(
    reducer(
      { id: 'abc' },
      {
        type: 'SET_LEARNING_PATH_STEP',
        payload: new Error('fail'),
        error: true,
      },
    ),
  ).toEqual({ id: 'abc' });

  expect(reducer(undefined, { type: 'SET_OEMBED_OBJECT', payload })).toEqual({
    oembed: { id: '123' },
  });

  expect(
    reducer({ id: 'abc' }, { type: 'SET_OEMBED_OBJECT', payload }),
  ).toEqual({ id: 'abc', oembed: { id: '123' } });

  expect(
    reducer(
      { id: 'abc' },
      { type: 'SET_OEMBED_OBJECT', payload: new Error('fail'), error: true },
    ),
  ).toEqual({ id: 'abc' });
});
