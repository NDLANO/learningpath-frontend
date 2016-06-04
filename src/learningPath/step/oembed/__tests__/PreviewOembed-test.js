import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import PreviewOembed from '../PreviewOembed';

test('component/PreviewOembed click button', t => {
  const preventDefault = spy();
  const content = {url: 'http://ndla.no/nb/node/142542', html: '<iframe src="http://ndla.no/nb/node/142542/oembed" allowfullscreen>'};
  const component = shallow(<PreviewOembed content={content} />);

  let frame = component.find('.learningsource__frame');
  t.equals(frame.prop('className'), 'learningsource__frame learningsource__frame--hidden');

  frame.find('a').simulate('click', { preventDefault });

  component.update();
  frame = component.find('.learningsource__frame');
  t.equals(frame.prop('className'), 'learningsource__frame');
  t.ok(preventDefault.calledOnce, 'preventDefault was called');

  t.end();
});
