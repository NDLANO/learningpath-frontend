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

import { addMessage } from '../../messages/messagesActions';
import { fetchEmbedSearch } from '../embedSearchActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;


test('actions/createLearningPathStep', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const query = {
    queryText: 'hei',
    page: 1,
    start: 1,
    filter: '',
  };

  const reply = {
    queries: {
      request: [
        { totalResults: 20 },
      ],
      items: [
        { title: 'hei' },
      ],
    },
  };

  const embedSearchApi = nock('http://google-api')
    .get('/customsearch/v1')
    .reply(200, reply);

  const store = mockStore({ authToken });

  store.dispatch(fetchEmbedSearch(query))
    .then(() => {
      t.deepEqual(store.getActions(), [
        addMessage({ message: 'Lagret OK' }),
        routerActions.push({ pathname: `/learningpaths/${pathId}/step/1234` }),
      ]);

      t.doesNotThrow(() => embedSearchApi.done());

      done();
    })
    .catch(done);
});
