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
import { change } from 'redux-form';

import { validateOembed, removeOembedPreview, setOembedPreview } from '../validateOembedActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

const stepFormWithoutTitle = {
  values: {
    url: 'https://www.youtube.com/watch?v=BTqu9iMiPIU',
    title: undefined,
    description: 'Test',
    showTitle: true,
    type: 'INTRODUCTION',
  },
};
const stepFormWithTitleTitle = {
  values: {
    url: 'https://www.youtube.com/watch?v=BTqu9iMiPIU',
    title: 'Youtube film',
    description: 'Test',
    showTitle: true,
    type: 'INTRODUCTION',
  },
};

test('actions/validiateOembed valid url and no step title', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };
  const url = 'https://www.youtube.com/watch?v=BTqu9iMiPIU';
  const oEmbedReply = { title: 'test', url, language: 'nb' };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/oembed')
    .query({ url })
    .reply(200, oEmbedReply);

  const store = mockStore({ authToken, form: { 'learning-path-step': stepFormWithoutTitle } });
  store.dispatch(validateOembed(url, 'nb'))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setOembedPreview(oEmbedReply),
        change('learning-path-step', 'title', oEmbedReply.title),
      ]);

      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});

test('actions/validiateOembed valid url and with step title', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };
  const url = 'https://www.youtube.com/watch?v=BTqu9iMiPIU';
  const oEmbedReply = { title: 'test', url, language: 'nb' };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/oembed')
    .query({ url })
    .reply(200, oEmbedReply);

  const store = mockStore({ authToken, form: { 'learning-path-step': stepFormWithTitleTitle } });
  store.dispatch(validateOembed(url, 'nb'))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setOembedPreview(oEmbedReply),
      ]);

      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});

test('actions/validiateOembed invalid url', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };
  const url = 'thisIsAnInvalidUrl';

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/oembed')
    .query({ url })
    .reply(501, { type: 'introduction', title: 'sup' });

  const store = mockStore({ authToken });

  store.dispatch(validateOembed(url, 'nb', 'url', 'feil'))
    .then(() => {
      t.doesNotThrow(() => apiMock.done());
      t.fail('Promise should be rejected.');
      done();
    })
    .catch((error) => {
      t.doesNotThrow(() => apiMock.done());
      t.deepEqual({ url: 'feil' }, error);
      done();
    });
});

test('actions/validiateOembed', (t) => {
  const done = (res) => {
    t.end(res);
  };

  const store = mockStore({ authToken });

  store.dispatch(validateOembed(''));
  t.deepEqual(store.getActions(), [
    removeOembedPreview(),
  ]);

  done();
});
