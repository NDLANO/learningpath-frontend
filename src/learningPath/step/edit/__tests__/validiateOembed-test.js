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

const stepFormWithTitle = {
  values: {
    url: 'https://www.youtube.com/watch?v=BTqu9iMiPIU',
    title: 'Youtube film',
    description: 'Test',
    showTitle: true,
    type: 'INTRODUCTION',
  },
};


const testValidateOembed = (t, url, store, apiReply, expectedActions) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/oembed')
    .query({ url })
    .reply(200, apiReply);

  store.dispatch(validateOembed(url, 'nb'))
    .then(() => {
      t.deepEqual(store.getActions(), expectedActions);

      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
};

test('actions/validiateOembed valid url and no step title', (t) => {
  const url = 'https://www.youtube.com/watch?v=BTqu9iMiPIU';
  const apiReply = { title: 'test', url, language: 'nb' };

  const store = mockStore({ authToken, form: { 'learning-path-step': stepFormWithoutTitle } });
  const expectedActions = [
    setOembedPreview(apiReply),
    change('learning-path-step', 'title', apiReply.title),
  ];
  testValidateOembed(t, url, store, apiReply, expectedActions);
});

test('actions/validiateOembed valid url and with step title', (t) => {
  const url = 'https://www.youtube.com/watch?v=BTqu9iMiPIU';
  const apiReply = { title: 'test', url, language: 'nb' };
  const store = mockStore({ authToken, form: { 'learning-path-step': stepFormWithTitle } });
  const expectedActions = [setOembedPreview(apiReply)];
  testValidateOembed(t, url, store, apiReply, expectedActions);
});

test('actions/validiateOembed valid url and replace step title if current form title equals current oembed title', (t) => {
  const url = 'http://ndla.no/nb/node/166201?fag=17&meny=15554';
  const apiReply = { title: 'test', url, language: 'nb' };
  const store = mockStore({ oembedPreview: { oembedContent: [{ title: 'Youtube film' }] }, authToken, form: { 'learning-path-step': stepFormWithTitle } });
  const expectedActions = [
    setOembedPreview(apiReply),
    change('learning-path-step', 'title', apiReply.title),
  ];
  testValidateOembed(t, url, store, apiReply, expectedActions);
});

test('actions/validiateOembed valid url and do not replace step title if current form title is not equal to current oembed title', (t) => {
  const url = 'http://ndla.no/nb/node/166201?fag=17&meny=15554';
  const apiReply = { title: 'test', url, language: 'nb' };
  const store = mockStore({ oembedPreview: { oembedContent: [{ title: 'ndla no' }] }, authToken, form: { 'learning-path-step': stepFormWithTitle } });
  const expectedActions = [
    setOembedPreview(apiReply),
  ];
  testValidateOembed(t, url, store, apiReply, expectedActions);
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
