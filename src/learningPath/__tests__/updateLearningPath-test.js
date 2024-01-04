/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import { routerActions } from "react-router-redux";
import payload403invalid from "../../actions/__tests__/payload403invalid";
import { testError } from "../../common/__tests__/testError";
import { applicationError, addMessage } from "../../messages/messagesActions";
import { updateLearningPath, setLearningPath } from "../learningPathActions";

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = "12345678";
const pathId = 123;

test("actions/updateLearningPath", (done) => {
  const patchPathApi = nock("http://ndla-api", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .patch(`/learningpath-api/v2/learningpaths/${pathId}`, {
      id: pathId,
      isRequest: true,
    })
    .reply(200, { id: pathId, isResponse: true });

  const store = mockStore({ accessToken });

  store
    .dispatch(
      updateLearningPath(pathId, {
        id: pathId,
        isRequest: true,
      }),
    )
    .then(() => {
      expect(store.getActions()).toEqual([
        addMessage({ message: "Lagret OK" }),
        setLearningPath({
          id: pathId,
          isResponse: true,
        }),
        routerActions.push({ pathname: `/learningpaths/${pathId}` }),
      ]);
      expect(() => patchPathApi.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test("actions/updateLearningPath with redirect", (done) => {
  const patchPathApi = nock("http://ndla-api", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .patch(`/learningpath-api/v2/learningpaths/${pathId}`, { id: pathId })
    .reply(200, { id: pathId });

  const store = mockStore({ accessToken });

  store
    .dispatch(updateLearningPath(pathId, { id: pathId }, "/goto/dev/null"))
    .then(() => {
      const actual = store.getActions();

      expect(actual.length).toBe(3);
      expect(actual[2]).toEqual(routerActions.push({ pathname: "/goto/dev/null" }));
      expect(() => patchPathApi.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test("actions/updateLearningPath access denied", (done) => {
  const apiMock = nock("http://ndla-api:80", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .patch(`/learningpath-api/v2/learningpaths/${pathId}`, {
      id: pathId,
      foo: "bar",
    })
    .reply(403, { message: "Invalid" });

  const store = mockStore({ accessToken });
  store
    .dispatch(updateLearningPath(pathId, { id: pathId, foo: "bar" }))
    .then(() => {
      testError("Should have failed");
    })
    .catch(() => {
      expect(store.getActions()).toEqual([
        applicationError(payload403invalid(`http://ndla-api/learningpath-api/v2/learningpaths/${pathId}`)),
        {
          payload: {
            message: "Du har ikke tilgang til dette akkurat nå",
            severity: "danger",
            timeToLive: 10000,
          },
          type: "ADD_MESSAGE",
        },
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    });
});
