/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
  items: [{ title: 'hei', id: 1 }, { title: 'heisann', id: 2 }],
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
test('component/EmbedSearchResult with results', () => {
  const component = shallow(<EmbedSearchResults {...propsWithItems} />);

  const pager = component.find('EmbedSearchPager');
  expect(pager.length).toBe(1);

  const results = component.find('EmbedSearchResult');
  expect(results.length).toBe(2);
});

test('component/EmbedSearchResult with no results', () => {
  const component = shallow(<EmbedSearchResults {...propsWithNoItems} />);

  const noResults = component.find('p');

  expect(noResults.length).toBe(1);
});
