/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ButtonPager from '../common/pager/ButtonPager';

const EmbedSearchPager = ({ query, pagerAction }) => {
  const onPagerButtonClicked = q => {
    if (query.start) {
      const nextIndex = query.start + (q.page - query.page) * 10;
      pagerAction(Object.assign({}, q, { start: nextIndex }));
    } else {
      pagerAction(q);
    }
  };
  return (
    <ButtonPager
      page={query.page}
      lastPage={query.numberOfPages}
      query={query}
      pagerAction={onPagerButtonClicked}
    />
  );
};
EmbedSearchPager.propTypes = {
  pagerAction: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
};

export default EmbedSearchPager;
