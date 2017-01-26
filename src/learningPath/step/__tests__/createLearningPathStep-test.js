/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { routerActions } from 'react-router-redux';
import payload403invalid from '../../../actions/__tests__/payload403invalid';

import { applicationError, addMessage } from '../../../messages/messagesActions';
import { createLearningPathStep } from '../learningPathStepActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;


test('actions/createLearningPathStep', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const learningStep = {
    title: [{ language: 'nb', title: 'Goat' }],
    description: [{ language: 'nb', description: 'this is a description' }],
    embedUrl: [{ language: 'nb', url: 'https://www.youtube.com/watch?v=ggB33d0BLcY' }],
  };

  const learningStepReply = Object.assign({}, learningStep, { id: 1234 });

  const postPathStepApi = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post(`/learningpath-api/v1/learningpaths/${pathId}/learningsteps`, learningStep)
    .reply(200, learningStepReply);

  const store = mockStore({ authToken });

  store.dispatch(createLearningPathStep(pathId, learningStep))
    .then(() => {
      t.deepEqual(store.getActions(), [
        addMessage({ message: 'Lagret OK' }),
        routerActions.push({ pathname: `/learningpaths/${pathId}/step/1234` }),
      ]);

      t.doesNotThrow(() => postPathStepApi.done());

      done();
    })
    .catch(done);
});

test('actions/createLearningPathStep access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const learningStep = {
    title: [{ language: 'nb', title: 'Goat' }],
    description: [{ language: 'nb', description: 'this is a description' }],
    embedUrl: [{ language: 'nb', url: 'https://www.youtube.com/watch?v=ggB33d0BLcY' }],
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post(`/learningpath-api/v1/learningpaths/${pathId}/learningsteps`, learningStep)
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ authToken });

  store.dispatch(createLearningPathStep(pathId, learningStep))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid(`http://ndla-api/learningpath-api/v1/learningpaths/${pathId}/learningsteps`)),
      ]);
      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});
