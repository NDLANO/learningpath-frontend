/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import LTISearch from '../ltiSearch/LTISearch';
import ExternalOembedSearch from './ExternalOembedSearch';

const ExternalEmbedSearchContainer = (props) => {
  const { currentFilter, learningPathId, addEmbedResult } = props;
  if (currentFilter.type === 'lti') {
    return (
      <LTISearch filter={currentFilter} addEmbedResult={addEmbedResult} learningPathId={learningPathId} />
    );
  }
  return (
    <ExternalOembedSearch addEmbedResult={addEmbedResult} />
  );
};

ExternalEmbedSearchContainer.propTypes = {
  currentFilter: PropTypes.object.isRequired,
  learningPathId: PropTypes.number.isRequired,
  addEmbedResult: PropTypes.func.isRequired,
};

export default ExternalEmbedSearchContainer;
