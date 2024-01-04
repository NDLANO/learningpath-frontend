/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getArticleResultFromState, getNumberOfArticlePages } from "../articleSelectors";

const state = {
  embedSearch: {
    ndla: {
      result: {
        results: [
          {
            id: 1,
            title: { title: "Test", language: "nb" },
            introduction: { introduction: "Test", language: "nb" },
            disabled: false,
          },
          {
            id: 2,
            title: { title: "Test3", language: "nb" },
            introduction: { introduction: "Test3", language: "nb" },
            disabled: false,
          },
          {
            id: 3,
            title: { title: "Test2", language: "nb" },
            introduction: { introduction: "Test2", language: "nb" },
            disabled: false,
          },
        ],
        totalCount: 3,
        pageSize: 10,
      },
    },
  },
};

test("selectors/getArticleResultFromState", () => {
  expect(getArticleResultFromState(state)).toMatchSnapshot();
});

test("selectors/getNumberOfArticlePages", () => {
  expect(getNumberOfArticlePages(state)).toEqual(1);
});
