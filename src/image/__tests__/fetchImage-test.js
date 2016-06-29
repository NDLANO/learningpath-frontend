import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from '../../actions/__tests__/payload403invalid';

import { applicationError } from '../../messages/messagesActions';
import { fetchLearningPathImage, setImage, fetchLearningPathImageWithMetaUrl } from '../../image/imageActions';
const middleware = [thunk];
const mockStore = configureStore(middleware);

const imageId = 123;

const imageMetaUrl = 'http://ndla-api:80/images/123';

test('actions/fetchImage with id', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get(`/images/${imageId}`)
    .reply(200, {id: imageId})
    .log(console.log);

  const store = mockStore({ });

  store.dispatch(fetchLearningPathImage(imageId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setImage({id: imageId})
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchImage with url', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get(`/images/${imageId}`)
    .reply(200, {id: imageId})
    .log(console.log);

  const store = mockStore({ });

  store.dispatch(fetchLearningPathImageWithMetaUrl(imageMetaUrl))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setImage({id: 123})
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchImage with id access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get(`/images/${imageId}`)
    .reply(403, {message: 'Invalid'});

  const store = mockStore();

  store.dispatch(fetchLearningPathImage(imageId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchImage with url access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get(`/images/${imageId}`)
    .reply(403, {message: 'Invalid'});

  const store = mockStore();

  store.dispatch(fetchLearningPathImage(imageId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
