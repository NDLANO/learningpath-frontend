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
import { routerActions } from 'react-router-redux';

import payload403invalid from '../../actions/__tests__/payload403invalid';
import { applicationError, addMessage } from '../../messages/messagesActions';
import { createLearningPath, setLearningPath } from '../learningPathActions';
import { createEmptyLearningPathStep } from '../step/learningPathStepActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345';
const pathId = 123;

test('actions/createLearningPath', () => {
  const done = (res) => {
    done(res);
    nock.cleanAll();
  };

  const learningsteps = [
    { seqNo: 1 },
    { seqNo: 0 },
    { seqNo: 2 },
  ];

  const postPathApi = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .post('/learningpaths', { isRequest: true, learningsteps })
    .reply(200, { id: pathId, isResponse: true });

  const postStep1Api = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .post(`/learningpaths/${pathId}/learningsteps`, { seqNo: 0 })
    .reply(200, { id: 12, seqNo: 0, isResponse: true });

  const postStep2Api = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .post(`/learningpaths/${pathId}/learningsteps`, { seqNo: 1 })
    .reply(200, { id: 34, seqNo: 1, isResponse: true });

  const postStep3Api = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .post(`/learningpaths/${pathId}/learningsteps`, { seqNo: 2 })
    .reply(200, { id: 56, seqNo: 2, isResponse: true });

  const store = mockStore({ accessToken });


  store.dispatch(
    createLearningPath({ isRequest: true, learningsteps })
  )
    .then(() => {
      expect(store.getActions()).toEqual([
        addMessage({ message: 'Lagret OK' }),
        setLearningPath({
          id: pathId,
          isResponse: true,
          learningsteps: [
            { id: 12, seqNo: 0, isResponse: true },
            { id: 34, seqNo: 1, isResponse: true },
            { id: 56, seqNo: 2, isResponse: true },
          ],
        }),
        createEmptyLearningPathStep(),
        routerActions.push({ pathname: `/learningpaths/${pathId}/step/new` }),
      ]);

      expect(() => postPathApi.done()).not.toThrow();
      expect(() => postStep1Api.done()).not.toThrow();
      expect(() => postStep2Api.done()).not.toThrow();
      expect(() => postStep3Api.done()).not.toThrow();

      done();
    })
    .catch(done);
});

test('actions/createLearningPath access denied', () => {
  const done = (res) => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .post('/learningpaths', {
      foo: 'bar',
    })
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ accessToken });

  store.dispatch(createLearningPath({ foo: 'bar' }))
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(payload403invalid('http://ndla-api/learningpaths')),
      ]);
      expect(() => apiMock.done()).not.toThrow();

      done();
    })
    .catch(done);
});
