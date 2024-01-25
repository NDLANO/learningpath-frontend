/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { saveStepObject } from "../EditLearningPathStep";

const stepWithId = {
  id: 1,
  title: "Old title",
  description: "Old description",
  someOtherField: "test",
};

const stepWithoutId = {
  title: "No id title",
  description: "No id description",
  someOtherField: "test",
};

test("util/saveStepObject description and embedUrl with step id", () => {
  const values = {
    title: "Test",
    description: "test",
    license: {
      license: "by-sa",
      description: "test",
    },
    showTitle: false,
    url: {
      embedType: "oembed",
      url: "https://ndla.no/id/3",
    },
  };

  expect(typeof saveStepObject).toBe("function");
  expect(saveStepObject(stepWithId, values, "nb")).toMatchSnapshot();
});

test("util/saveStepObject only description with step id", () => {
  const values = {
    title: "Test",
    description: "test",
    license: {
      license: "by-sa",
      description: "test",
    },
    showTitle: false,
    url: {
      embedType: "oembed",
      url: "",
    },
  };

  expect(typeof saveStepObject).toBe("function");
  expect(saveStepObject(stepWithId, values, "nb")).toMatchSnapshot();
});

test("util/saveStepObject only url with step id", () => {
  const values = {
    title: "Test",
    description: "",
    license: {
      license: "by-sa",
      description: "test",
    },
    showTitle: false,
    url: {
      embedType: "oembed",
      url: "https://ndla.no/id/3",
    },
  };

  expect(typeof saveStepObject).toBe("function");
  expect(saveStepObject(stepWithId, values, "nb")).toMatchSnapshot();
});

// formatFormFieldsUtil

test("util/saveStepObject description and embedUrl with no step id", () => {
  const values = {
    title: "Test",
    description: "test",
    license: {
      license: "by-sa",
      description: "test",
    },
    showTitle: false,
    url: {
      embedType: "oembed",
      url: "https://ndla.no/id/3",
    },
  };

  expect(typeof saveStepObject).toBe("function");
  expect(saveStepObject(stepWithoutId, values, "nb")).toMatchSnapshot();
});

test("util/saveStepObject only description with no step id", () => {
  const values = {
    title: "Test",
    description: "test",
    license: {
      license: "by-sa",
      description: "test",
    },
    showTitle: false,
    url: {
      embedType: "oembed",
      url: "",
    },
  };

  expect(typeof saveStepObject).toBe("function");
  expect(saveStepObject(stepWithoutId, values, "nb")).toMatchSnapshot();
});

test("util/saveStepObject only url with no step id", () => {
  const values = {
    title: "Test",
    description: "",
    license: {
      license: "by-sa",
      description: "test",
    },
    showTitle: false,
    url: {
      embedType: "oembed",
      url: "https://ndla.no/id/3",
    },
  };

  expect(typeof saveStepObject).toBe("function");
  expect(saveStepObject(stepWithoutId, values, "nb")).toMatchSnapshot();
});
