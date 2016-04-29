import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/validiateOembed valid url', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  const url = 'https://www.youtube.com/watch?v=BTqu9iMiPIU';

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/oembed/?url=' + encodeURIComponent(url))
    .reply(200, {type: 'introduction', title: 'sup'});

  const store = mockStore({ authToken });

  store.dispatch( actions.validateOembed(url) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setIsValidOembed(true)
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
    .get('/oembed/?url=' + url)
    .reply(501, {type: 'introduction', title: 'sup'});

  const store = mockStore({ authToken });

  store.dispatch( actions.validateOembed(url) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setIsValidOembed(false)
      ]);

      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});

test('actions/validiateOembed', t => {
  const done = res => {
    t.end(res);
  };

  const store = mockStore({ authToken });

  store.dispatch( actions.validateOembed('') );
  t.deepEqual(store.getActions(), [
    actions.removeLearningPathStepEmbedContent(),
    actions.setIsValidOembed(true)
  ]);

  done();
});
