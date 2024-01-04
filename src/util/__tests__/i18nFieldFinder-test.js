/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { oembedContentI18N } from "../i18nFieldFinder";

test("util/i18nFieldFinder oembedContentI18N", () => {
  expect(typeof oembedContentI18N).toBe("function");

  const learningPathStep = {
    embedUrl: [
      {
        url: "http://example.com/sv",
        html: '<iframe src="http://example.com/sv">',
        width: 500,
        language: "sv",
      },
      {
        url: "http://example.com",
        html: '<iframe src="http://example.com">',
        width: 500,
        language: "nb",
      },
    ],
  };

  expect(oembedContentI18N(learningPathStep, "nb")).toEqual({
    url: "http://example.com",
    html: '<iframe src="http://example.com">',
    width: 500,
    language: "nb",
  });

  expect(oembedContentI18N(learningPathStep, "eo")).toBeFalsy();
});
