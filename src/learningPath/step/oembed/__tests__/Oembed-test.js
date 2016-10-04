/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import '../../../../common/__tests__/jsdomEnv';

import { learningStep, ndlaLearningStep } from '../../../../common/__tests__/mockData';

import Oembed, { urlIsNDLA } from '../Oembed';

test('component/Oembed urlIsNDLA', (t) => {
  t.ok(urlIsNDLA('http://ndla.no/nb/node/12345'));
  t.notOk(urlIsNDLA('http://exampe.com/ndla.no/nb/node/12345'));
  t.notOk(urlIsNDLA());

  t.end();
});

test('component/Oembed', (t) => {
  const oembed = learningStep.oembed;
  const component = mount(<Oembed oembedContent={oembed} />);

  const div = component.find('.learning-step');

  t.equal(div.length, 1);
  t.notOk(div.is('.learning-step--without-dimensions'), 'not .learning-step--without-dimensions');
  t.deepEqual(div.prop('dangerouslySetInnerHTML'), { __html: oembed.html });

  t.notOk(component.state('isNDLAResource'), 'state.isNDLAResource');
  t.notOk(component.state('listeningToResize'), 'state.listeningToResize');

  t.end();
});

test('component/Oembed ndla resource', (t) => {
  const addEventListener = spy(window, 'addEventListener');

  const oembed = ndlaLearningStep.oembed;
  const component = mount(<Oembed oembedContent={oembed} />);

  const div = component.find('.learning-step');

  t.equal(div.length, 1);
  t.ok(div.is('.learning-step--without-dimensions'), '.learning-step--without-dimensions');
  t.deepEqual(div.prop('dangerouslySetInnerHTML'), { __html: oembed.html });

  t.ok(component.state('isNDLAResource'), 'state.isNDLAResource');
  t.ok(component.state('listeningToResize'), 'state.listeningToResize');

  t.equal(addEventListener.callCount, 1, 'addEventListener');
  t.deepEqual(addEventListener.firstCall.args,
      ['message', component.instance().handleResizeMessage],
      'iframeResizer listening');

  t.end();
  window.addEventListener.restore();
});

test('component/Oembed resize message listener', (t) => {
  const add = spy(window, 'addEventListener');
  const remove = spy(window, 'removeEventListener');

  const oembed = learningStep.oembed;
  const ndlaOembed1 = ndlaLearningStep.oembed;
  const ndlaOembed2 = Object.assign({}, ndlaOembed1, { url: `${ndlaOembed1.url}?another` });
  const ndlaOembed3 = Object.assign({}, ndlaOembed1, { url: `${ndlaOembed1.url}?yetanother` });

  // initialize with ndla resource
  const component = mount(<Oembed oembedContent={ndlaOembed1} />);

  t.equal(add.callCount, 1, '1st addEventListener');
  t.equal(remove.callCount, 0, '1st removeEventListener');

  // update with other ndla resource
  component.setProps({ oembedContent: ndlaOembed2 });

  t.equal(add.callCount, 1, '2nd addEventListener');
  t.equal(remove.callCount, 0, '2nd removeEventListener');

  // update with non-ndla resource
  component.setProps({ oembedContent: oembed });

  t.equal(add.callCount, 1, '3rd addEventListener');
  t.equal(remove.callCount, 1, '3rd removeEventListener');

  t.notOk(component.state('isNDLAResource'), 'state.isNDLAResource');
  t.notOk(component.state('listeningToResize'), 'state.listeningToResize');

  t.deepEqual(remove.firstCall.args,
      ['message', component.instance().handleResizeMessage],
      'iframeResizer stopped');

  // update with other ndla resource
  component.setProps({ oembedContent: ndlaOembed3 });

  t.equal(add.callCount, 2, '4th addEventListener');
  t.equal(remove.callCount, 1, '4th removeEventListener');

  t.end();

  window.addEventListener.restore();
  window.removeEventListener.restore();
});

test('component/Oembed iframe resizing', (t) => {
  const ndlaOembed = ndlaLearningStep.oembed;
  const oembed = learningStep.oembed;

  const component = mount(<Oembed oembedContent={ndlaOembed} />);
  const instance = component.instance();

  const iframe = instance.getIframeDOM();

  t.ok(iframe, 'has iframe');
  t.equal(iframe.src, 'http://ndla.no/nb/node/24049/oembed');


  instance.handleResizeMessage({
    source: iframe.contentWindow, data: { height: '800' },
  });

  t.equal(iframe.style.height, '835px');


  instance.handleResizeMessage({
    source: iframe.contentWindow, data: { height: '1000' },
  });

  t.equal(iframe.style.height, '1035px');


  instance.handleResizeMessage({
    source: iframe.contentWindow, data: { height: '900' },
  });

  t.equal(iframe.style.height, '1035px');

  t.doesNotThrow(() => instance.handleResizeMessage());

  instance.handleResizeMessage({
    source: { mysteryObject: true }, data: { height: '2000' },
  });

  t.equal(iframe.style.height, '1035px');


  component.setProps({ oembedContent: oembed });

  const nextIframe = instance.getIframeDOM();
  t.equal(nextIframe.style.height, '');

  instance.handleResizeMessage({
    source: nextIframe.contentWindow, data: { height: '2000' },
  });

  t.equal(nextIframe.style.height, '');

  t.end();
});
