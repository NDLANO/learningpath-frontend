import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { validateOembed } from '..';
import { removeOembedPreview, setOembedPreview } from '../validateOembed';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/validiateOembed valid url', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  const url = 'https://www.youtube.com/watch?v=BTqu9iMiPIU';
  const oEmbedReply = { url, language: 'nb' };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/oembed')
    .query({ url })
    .reply(200, oEmbedReply);

  const store = mockStore({ authToken });

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

test('actions/validiateOembed invalid url', t => {
  const done = res => {
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

test('actions/validiateOembed', t => {
  const done = res => {
    t.end(res);
  };

  const store = mockStore({ authToken });

  store.dispatch(validateOembed(''));
  t.deepEqual(store.getActions(), [
    removeOembedPreview(),
  ]);

  done();
});
