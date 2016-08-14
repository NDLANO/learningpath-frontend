/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setLearningPathSearchResults } from '../learningPathSearchActions';


test('actions/setLearningPathSearchResults', (t) => {
  const actual = setLearningPathSearchResults({
    results: [{ id: '12345' }, { id: '67890' }],
    totalCount: 300,
  });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH_SEARCH_RESULTS');
  t.deepEqual(actual.payload, {
    results: [{ id: '12345' }, { id: '67890' }],
    totalCount: 300,
  });
  t.notOk(actual.error);

  t.end();
});

test('actions/setLearningPathSearchResults with error', (t) => {
  const actual = setLearningPathSearchResults(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH_SEARCH_RESULTS');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
