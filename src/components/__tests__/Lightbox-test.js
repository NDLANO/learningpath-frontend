import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import Lightbox from '../Lightbox';

test('component/Lightbox', t => {
  const component = shallow(<Lightbox><h1>enlighted!</h1></Lightbox>);
  t.ok(component.hasClass('lightbox'), 'has .lightbox');

  const contentContainer = component.find('.lightbox_content');
  t.equal(contentContainer.length, 1, 'has one .lightbox_content');

  t.equal(contentContainer.children().length, 1, 'contains one content element');

  const content = contentContainer.children().at(0);
  t.equal(content.html(), '<h1>enlighted!</h1>', 'contains nested children');

  t.end();
});

