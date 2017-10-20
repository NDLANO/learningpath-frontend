/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import PreviewOembed from '../PreviewOembed';

test('component/PreviewOembed click button', () => {
  const preventDefault = spy();
  const content = { url: 'http://ndla.no/nb/node/142542', html: '<iframe src="http://ndla.no/nb/node/142542/oembed" allowfullscreen>' };
  const component = shallow(<PreviewOembed content={content} />);

  let frame = component.find('.learningsource__frame');
  expect(frame.prop('className')).toBe('learningsource__frame learningsource__frame--hidden');

  frame.find('button').simulate('click', { preventDefault });

  component.update();
  frame = component.find('.learningsource__frame');
  expect(frame.prop('className')).toBe('learningsource__frame');
  expect(preventDefault.calledOnce).toBeTruthy();
});
