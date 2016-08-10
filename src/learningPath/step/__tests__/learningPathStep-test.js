/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';

import reducer from '../learningPathStepReducer';

const payload = { id: '123' };

test('reducers/learningPathStep', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '{}',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_LEARNING_PATH_STEP', payload }),
    { id: '123' },
    'set state'
  );

  t.deepEqual(
    reducer({ id: 'abc' }, { type: 'SET_LEARNING_PATH_STEP', payload }),
    { id: '123' },
    'change state'
  );

  t.deepEqual(
    reducer({ id: 'abc' },
      { type: 'DO_NOT_SET_LEARNING_PATH_STEP', payload }),
    { id: 'abc' },
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({ id: 'abc' },
      { type: 'SET_LEARNING_PATH_STEP', payload: new Error('fail'), error: true }),
    { id: 'abc' },
    'ignore errors'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_OEMBED_OBJECT', payload }),
    { oembed: { id: '123' } },
    'set state'
  );

  t.deepEqual(
    reducer({ id: 'abc' }, { type: 'SET_OEMBED_OBJECT', payload }),
    { id: 'abc', oembed: { id: '123' } },
    'change state'
  );

  t.deepEqual(
    reducer({ id: 'abc' },
      { type: 'SET_OEMBED_OBJECT', payload: new Error('fail'), error: true }),
    { id: 'abc' },
    'ignore errors'
  );

  t.end();
});
