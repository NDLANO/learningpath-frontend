/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { routerActions } from "react-router-redux";
import nock from "nock";
import payload403invalid from "../../actions/__tests__/payload403invalid";
import { testError } from "../../common/__tests__/testError";
import { applicationError } from "../../messages/messagesActions";
import { fetchLearningPath, setLearningPath } from "../learningPathActions";
import { setSavedImage, setSelectedImage } from "../../imageSearch/imageActions";

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = "12345678";
const pathId = 123;

test("actions/fetchLearningPath without image", (done) => {
  const apiMock = nock("http://ndla-api", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v2/learningpaths/${pathId}`)
    .reply(200, { id: pathId });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPath(pathId))
    .then(() => {
      expect(store.getActions()).toEqual([setLearningPath({ id: pathId }), setSavedImage({}), setSelectedImage({})]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test("actions/fetchLearningPath with image", (done) => {
  const apiMock = nock("http://ndla-api", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v2/learningpaths/${pathId}`)
    .reply(200, {
      id: pathId,
      coverPhoto: { url: "test", metaUrl: "metaTest" },
    });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPath(pathId))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPath({
          id: pathId,
          coverPhoto: { url: "test", metaUrl: "metaTest" },
        }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test("actions/fetchLearningPath with isEdit true and canEdit false", (done) => {
  const apiMock = nock("http://ndla-api", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v2/learningpaths/${pathId}`)
    .reply(200, { id: pathId, canEdit: false });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPath(pathId, true))
    .then(() => {
      expect(store.getActions()).toEqual([
        routerActions.push({ pathname: "/forbidden" }),
        setLearningPath({ id: pathId, canEdit: false }),
        setSavedImage({}),
        setSelectedImage({}),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test("actions/fetchLearningPath with isEdit true and canEdit true", (done) => {
  const apiMock = nock("http://ndla-api", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v2/learningpaths/${pathId}`)
    .reply(200, { id: pathId, canEdit: true });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPath(pathId, true))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPath({ id: pathId, canEdit: true }),
        setSavedImage({}),
        setSelectedImage({}),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test("actions/fetchLearningPath access denied", (done) => {
  const apiMock = nock("http://ndla-api", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v2/learningpaths/${pathId}`)
    .reply(403, { message: "Invalid" });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPath(pathId))
    .then(() => {
      testError("Should have failed");
    })
    .catch(() => {
      expect(store.getActions()).toEqual([
        routerActions.push({ pathname: "/forbidden" }),
        applicationError(payload403invalid(`http://ndla-api/learningpath-api/v2/learningpaths/${pathId}`)),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    });
});
