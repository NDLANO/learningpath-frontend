/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';

import reducer from '../pinterestReducer';

const pinsPayload = ['test1', 'test2'];


test('reducers/pinterestReducer', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '{"pins":[],"fetchingPins":false}',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_PINS', payload: pinsPayload }),
    { fetchingPins: false, pins: ['test1', 'test2'] },
    'set state'
  );

  t.deepEqual(
    reducer({ fetchingPins: false, pins: ['test1', 'test3'] }, { type: 'SET_PINS', payload: pinsPayload }),
    { fetchingPins: false, pins: ['test1', 'test2'] },
    'change state'
  );

  t.deepEqual(
    reducer({ fetchingPins: false, pins: ['test1', 'test3'] },
      { type: 'DO_NOT_SET_PINS', payload: pinsPayload }),
    { fetchingPins: false, pins: ['test1', 'test3'] },
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({ fetchingPins: false, pins: ['test1', 'test2'] },
      { type: 'SET_PINS', payload: new Error('fail'), error: true }),
    { fetchingPins: false, pins: ['test1', 'test2'] },
    'ignore errors'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_FETCHING_PINS', payload: true }),
    { fetchingPins: true, pins: [] },
    'set state'
  );

  t.deepEqual(
    reducer({ fetchingPins: true, pins: ['test1', 'test3'] }, { type: 'SET_FETCHING_PINS', payload: false }),
    { fetchingPins: false, pins: ['test1', 'test3'] },
    'change state'
  );

  t.deepEqual(
    reducer({ fetchingPins: true, pins: ['test1', 'test3'] },
      { type: 'SET_FETCHING_PINS', payload: new Error('fail'), error: true }),
    { fetchingPins: true, pins: ['test1', 'test3'] },
    'ignore errors'
  );

  t.deepEqual(
    reducer(undefined, { type: 'REMOVE_PINS', payload: {} }),
    { fetchingPins: false, pins: [] },
    'set state'
  );

  t.deepEqual(
    reducer({ fetchingPins: true, pins: ['test1', 'test3'] }, { type: 'REMOVE_PINS', payload: {} }),
    { fetchingPins: false, pins: [] },
    'change state'
  );

  t.end();
});
