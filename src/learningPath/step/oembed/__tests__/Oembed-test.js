/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { mount } from 'enzyme';
import {
  translatedLearningStep,
  translatedNdlaLearningStep,
} from '../../../../common/__tests__/translatedMockData';

import Oembed from '../Oembed';

let component;
let add;
let remove;

beforeEach(() => {
  add = jest.spyOn(window, 'addEventListener');
  remove = jest.spyOn(window, 'removeEventListener');
});

afterEach(() => {
  add.mockReset();
  add.mockRestore();
  remove.mockReset();
  remove.mockRestore();
  component.unmount();
});

// TODO: Check why addEventListener is called six times and not one.
test('component/Oembed', () => {
  const oembed = translatedLearningStep.oembed;
  component = mount(<Oembed oembedContent={oembed} />);
  const div = component.find('.learning-step');

  expect(div.length).toBe(1);
  expect(div.is('.learning-step--without-dimensions')).toBeFalsy();
  expect(div.prop('dangerouslySetInnerHTML')).toEqual({ __html: oembed.html });

  expect(component.state('isNDLAResource')).toBeFalsy();
  expect(component.state('listeningToResize')).toBeFalsy();
});

test('component/Oembed ndla resource', () => {
  const oembed = translatedNdlaLearningStep.oembed;
  component = mount(<Oembed oembedContent={oembed} />);

  const div = component.find('.learning-step');

  expect(div.length).toBe(1);
  expect(div.is('.learning-step--without-dimensions')).toBeTruthy();
  expect(div.prop('dangerouslySetInnerHTML')).toEqual({ __html: oembed.html });

  expect(component.state('isNDLAResource')).toBeTruthy();
  expect(component.state('listeningToResize')).toBeTruthy();
  // expect(add).toHaveBeenCalledTimes(1);
  expect(add).toHaveBeenCalledWith(
    'message',
    component.instance().handleResizeMessage,
  );
});

test('component/Oembed resize message listener', () => {
  const oembed = translatedLearningStep.oembed;
  const ndlaOembed1 = translatedNdlaLearningStep.oembed;
  const ndlaOembed2 = Object.assign({}, ndlaOembed1, {
    url: `${ndlaOembed1.url}?another`,
  });
  const ndlaOembed3 = Object.assign({}, ndlaOembed1, {
    url: `${ndlaOembed1.url}?yetanother`,
  });

  // initialize with ndla resource
  component = mount(<Oembed oembedContent={ndlaOembed1} />);

  // expect(add).toHaveBeenCalledTimes(1);
  // expect(remove).toHaveBeenCalledTimes(0);

  // update with other ndla resource
  component.setProps({ oembedContent: ndlaOembed2 });

  // expect(add).toHaveBeenCalledTimes(1);
  // expect(remove).toHaveBeenCalledTimes(0);

  // update with non-ndla resource
  component.setProps({ oembedContent: oembed });

  // expect(add).toHaveBeenCalledTimes(1);
  // expect(remove).toHaveBeenCalledTimes(1);

  expect(component.state('isNDLAResource')).toBeFalsy();
  expect(component.state('listeningToResize')).toBeFalsy();

  expect(remove).toHaveBeenCalledWith(
    'message',
    component.instance().handleResizeMessage,
  );

  // update with other ndla resource
  component.setProps({ oembedContent: ndlaOembed3 });
});

test('component/Oembed iframe resizing', () => {
  const ndlaOembed = translatedNdlaLearningStep.oembed;
  const oembed = translatedLearningStep.oembed;

  component = mount(<Oembed oembedContent={ndlaOembed} />);
  const instance = component.instance();

  const iframe = instance.getIframeDOM();

  expect(iframe).toBeTruthy();
  expect(iframe.src).toBe('http://ndla.no/nb/node/24049/oembed');

  instance.handleResizeMessage({
    source: iframe.contentWindow,
    data: { height: '800' },
  });

  expect(iframe.style.height).toBe('800px');

  instance.handleResizeMessage({
    source: iframe.contentWindow,
    data: { height: '1000' },
  });

  expect(iframe.style.height).toBe('1000px');

  instance.handleResizeMessage({
    source: iframe.contentWindow,
    data: { height: '900' },
  });

  expect(iframe.style.height).toBe('900px');

  expect(() => instance.handleResizeMessage()).not.toThrow();

  instance.handleResizeMessage({
    source: { mysteryObject: true },
    data: { height: '2000' },
  });

  expect(iframe.style.height).toBe('900px');

  component.setProps({ oembedContent: oembed });

  const nextIframe = instance.getIframeDOM();
  expect(nextIframe.style.height).toBe('');

  instance.handleResizeMessage({
    source: nextIframe.contentWindow,
    data: { height: '2000' },
  });

  expect(nextIframe.style.height).toBe('');
});
