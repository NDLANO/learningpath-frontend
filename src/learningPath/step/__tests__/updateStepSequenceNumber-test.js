/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from '../../../actions/__tests__/payload403invalid';
import { testError } from '../../../common/__tests__/testError';
import { applicationError } from '../../../messages/messagesActions';
import { updateStepSequenceNumber } from '../learningPathStepActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '12345678';
const pathId = 123;
const stepId = 321;
const seqNo = 3;

test('actions/updateStepSequenceNumber sucessfully', done => {
  const body = {
    seqNo: 3,
  };

  const learningStepReply = Object.assign({}, body, {});

  // updateSeqNo
  nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .put(
      `/learningpath-api/v2/learningpaths/${pathId}/learningsteps/${
        stepId
      }/seqNo`,
      body,
    )
    .reply(200, learningStepReply);
  // fetchLearningPath
  nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v2/learningpaths/${pathId}`)
    .reply(200, { id: pathId });

  const store = mockStore({ accessToken });

  store
    .dispatch(updateStepSequenceNumber(pathId, stepId, seqNo))
    .then(() => {
      expect(store.getActions()).toEqual([]);
      expect(() => nock.isDone()).not.toThrow();
      done();
    })
    .catch(testError);
});

test('actions/updateStepSequenceNumber access denied', done => {
  const body = {
    seqNo: 3,
  };

  // updateSeqNo
  nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .put(
      `/learningpath-api/v2/learningpaths/${pathId}/learningsteps/${
        stepId
      }/seqNo`,
      body,
    )
    .reply(403, { message: 'Invalid' });

  // fetchLearningPath
  nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v2/learningpaths/${pathId}`)
    .reply(200, { id: pathId });

  const store = mockStore({ accessToken });

  store
    .dispatch(updateStepSequenceNumber(pathId, stepId, seqNo))
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(
          payload403invalid(
            `http://ndla-api/learningpath-api/v2/learningpaths/${
              pathId
            }/learningsteps/${stepId}/seqNo`,
          ),
        ),
      ]);
      expect(() => nock.isDone()).not.toThrow();
      done();
    })
    .catch(testError);
});
