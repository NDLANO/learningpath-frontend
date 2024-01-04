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
import payload403invalid from "../../../../actions/__tests__/payload403invalid";
import { testError } from "../../../../common/__tests__/testError";
import { applicationError } from "../../../../messages/messagesActions";
import { fetchLearningPathTags, setLearningPathTags } from "../learningPathTagsActions";

const middleware = [thunk];
const mockStore = configureStore(middleware);

const tags = [
  { language: "nb", tags: ["norsk", "norge"] },
  { language: "en", tags: ["norwegian", "norway"] },
];

test("actions/fetchLearningPathTags", (done) => {
  const apiMock = nock("http://ndla-api")
    .get("/learningpath-api/v2/learningpaths/tags/?language=nb&fallback=true")
    .reply(200, tags);

  const store = mockStore({ locale: "nb" });

  store
    .dispatch(fetchLearningPathTags())
    .then(() => {
      expect(store.getActions()).toEqual([setLearningPathTags(tags)]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test("actions/fetchLearningPathTags access denied", (done) => {
  const apiMock = nock("http://ndla-api")
    .get("/learningpath-api/v2/learningpaths/tags/?language=nb&fallback=true")
    .reply(403, { message: "Invalid" });

  const store = mockStore({ locale: "nb" });

  store
    .dispatch(fetchLearningPathTags())
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(payload403invalid("http://ndla-api/learningpath-api/v2/learningpaths/tags/")),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});
