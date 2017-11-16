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
import payload403invalid from '../../../../actions/__tests__/payload403invalid';

import { applicationError } from '../../../../messages/messagesActions';
import {
  fetchLearningPathTags,
  setLearningPathTags,
} from '../learningPathTagsActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345';
const tags = [
  { language: 'nb', tags: ['norsk', 'norge'] },
  { language: 'en', tags: ['norwegian', 'norway'] },
];

test('actions/fetchLearningPathTags', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/learningpath-api/v1/learningpaths/tags')
    .reply(200, tags);

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPathTags())
    .then(() => {
      expect(store.getActions()).toEqual([setLearningPathTags(tags)]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathTags access denied', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/learningpath-api/v1/learningpaths/tags')
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPathTags())
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(
          payload403invalid(
            'http://ndla-api/learningpath-api/v1/learningpaths/contributors',
          ),
        ),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});
