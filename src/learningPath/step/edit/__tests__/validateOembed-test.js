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
import { change } from 'redux-form';
import { testError } from '../../../../common/__tests__/testError';
import {
  validateOembed,
  removeOembedPreview,
  setOembedPreview,
} from '../validateOembedActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '12345678';

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

const testValidateOembed = (
  url,
  embedType,
  store,
  apiReply,
  expectedActions,
  done,
) => {
  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/oembed-proxy/v1/oembed')
    .query({ url })
    .reply(200, apiReply);

  store
    .dispatch(validateOembed(url, 'nb', embedType))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);

      expect(() => apiMock.done()).not.toThrow();

      done();
    })
    .catch(testError);
};

test('actions/validateOembed valid url and no step title', done => {
  const url = 'https://www.youtube.com/watch?v=BTqu9iMiPIU';
  const embedType = 'oembed';

  const apiReply = { embedType: 'oembed', title: 'test', url, language: 'nb' };

  const store = mockStore({
    accessToken,
    form: { 'learning-path-step': stepFormWithoutTitle },
  });
  const expectedActions = [
    setOembedPreview(apiReply),
    change('learning-path-step', 'title', apiReply.title),
  ];
  testValidateOembed(url, embedType, store, apiReply, expectedActions, done);
});

test('actions/validateOembed valid url and with step title', done => {
  const url = 'https://www.youtube.com/watch?v=BTqu9iMiPIU';
  const embedType = 'oembed';
  const apiReply = { embedType, title: 'test', url, language: 'nb' };
  const store = mockStore({
    accessToken,
    form: { 'learning-path-step': stepFormWithTitle },
  });
  const expectedActions = [setOembedPreview(apiReply)];
  testValidateOembed(url, embedType, store, apiReply, expectedActions, done);
});

test('actions/validateOembed valid url and replace step title if current form title equals current oembed title', done => {
  const url = 'http://ndla.no/nb/node/166201?fag=17&meny=15554';
  const embedType = 'oembed';
  const apiReply = { embedType, title: 'test', url, language: 'nb' };
  const store = mockStore({
    oembedPreview: { oembedContent: [{ title: 'Youtube film' }] },
    accessToken,
    form: { 'learning-path-step': stepFormWithTitle },
  });
  const expectedActions = [
    setOembedPreview(apiReply),
    change('learning-path-step', 'title', apiReply.title),
  ];
  testValidateOembed(url, embedType, store, apiReply, expectedActions, done);
});

test('actions/validateOembed valid url and do not replace step title if current form title is not equal to current oembed title', done => {
  const url = 'http://ndla.no/nb/node/166201?fag=17&meny=15554';
  const embedType = 'oembed';
  const apiReply = { embedType, title: 'test', url, language: 'nb' };
  const store = mockStore({
    oembedPreview: { oembedContent: [{ title: 'ndla no' }] },
    accessToken,
    form: { 'learning-path-step': stepFormWithTitle },
  });
  const expectedActions = [setOembedPreview(apiReply)];
  testValidateOembed(url, embedType, store, apiReply, expectedActions, done);
});

test('actions/validateOembed invalid url', done => {
  const url = 'thisIsAnInvalidUrl';

  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/oembed-proxy/v1/oembed')
    .query({ url })
    .reply(501, { type: 'introduction', title: 'sup' });

  const store = mockStore({ accessToken });

  store
    .dispatch(validateOembed(url, 'nb', 'oembed', 'url', 'feil'))
    .then(() => {
      testError('Should not be here');
    })
    .catch(error => {
      expect(() => apiMock.done()).not.toThrow();
      expect({ url: 'feil' }).toEqual(error);
      nock.cleanAll();
      done();
    });
});

test('actions/validateOembed', () => {
  const store = mockStore({ accessToken });

  store.dispatch(validateOembed(''));
  expect(store.getActions()).toEqual([removeOembedPreview()]);
});
