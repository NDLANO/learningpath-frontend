/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import EmbedSearchResults from '../EmbedSearchResults';

const propsWithNoItems = {
  items: [],
  onPreviewClick: noop,
  addEmbedResult: noop,
  query: {
    textQuery: 'hei',
    page: 1,
    start: 1,
    filter: '',
  },
  pagerAction: noop,
};
const propsWithItems = {
  items: [
    { title: 'hei' },
    { title: 'heisann' },
  ],
  onPreviewClick: noop,
  addEmbedResult: noop,
  query: {
    textQuery: 'hei',
    page: 1,
    start: 1,
    filter: '',
  },
  pagerAction: noop,
};
test('component/EmbedSearchResult with results', (t) => {
  const component = shallow(<EmbedSearchResults {...propsWithItems} />);

  const pager = component.find('EmbedSearchPager');
  t.equal(pager.length, 1, 'One pager found');

  const results = component.find('EmbedSearchResult');
  t.equal(results.length, 2, 'Two results found');

  t.end();
});

test('component/EmbedSearchResult with no results', (t) => {
  const component = shallow(<EmbedSearchResults {...propsWithNoItems} />);

  const noResults = component.find('p');

  t.equal(noResults.length, 1, 'no results found p tag');

  t.end();
});
