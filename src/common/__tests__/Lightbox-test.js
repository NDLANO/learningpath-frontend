/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import { shallow } from "enzyme";

import Lightbox from "../Lightbox";

test("component/Lightbox", () => {
  const component = shallow(
    <Lightbox display onClose={() => {}}>
      <h1>enlighted!</h1>
    </Lightbox>,
  );
  expect(component.hasClass("lightbox")).toBeTruthy();

  const contentContainer = component.find(".lightbox_content");
  expect(contentContainer.length).toBe(1);

  expect(contentContainer.children().length).toBe(2);

  const content = contentContainer.children().at(1);
  expect(content.html()).toBe("<h1>enlighted!</h1>");
});
