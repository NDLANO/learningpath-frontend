/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { configureLocale, getHtmlLang, isValidLocale } from "../configureLocale";

test("configureLocale configureLocale()", () => {
  expect(configureLocale("en").currentLocale).toBe("en");
  expect(configureLocale("en").phrases["footer.aboutNDLA"]).toBe("About NDLA");

  expect(configureLocale("nb").currentLocale).toBe("nb");
  expect(configureLocale("nb").phrases["footer.aboutNDLA"]).toBe("Om NDLA");

  // Defaults to nb if locale not found
  expect(configureLocale("ru").currentLocale).toBe("nb");
  expect(configureLocale("ru").phrases["footer.aboutNDLA"]).toBe("Om NDLA");
});

test("configureLocale isValidLocale()", () => {
  expect(isValidLocale("nb")).toBe(true);
  expect(isValidLocale("nn")).toBe(true);
  expect(isValidLocale("en")).toBe(true);
  expect(isValidLocale("aa")).toBe(false);
  expect(isValidLocale("ub")).toBe(false);
});

test("configureLocale getHtmlLang()", () => {
  expect(getHtmlLang("nb")).toBe("nb");
  expect(getHtmlLang("nn")).toBe("nn");
  expect(getHtmlLang("en")).toBe("en");
  expect(getHtmlLang("aa")).toBe("nb");
});
