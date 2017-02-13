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
  const { currentFilter, embedTypeOnBlur, urlOnBlur, learningPathId, closeExternalSearch, addEmbedResult } = props;
  if (currentFilter.type === 'lti') {
    return (
      <LTISearch filter={currentFilter} embedTypeOnBlur={embedTypeOnBlur} urlOnBlur={urlOnBlur} learningPathId={learningPathId} closeExternalSearch={closeExternalSearch} />
    );
  }
  return (
    <ExternalOembedSearch
      urlOnBlur={urlOnBlur}
      addEmbedResult={addEmbedResult}
    />
  );
};

ExternalEmbedSearchContainer.propTypes = {
  currentFilter: PropTypes.object.isRequired,
  embedTypeOnBlur: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
  learningPathId: PropTypes.number.isRequired,
  closeExternalSearch: PropTypes.func.isRequired,
  addEmbedResult: PropTypes.func.isRequired,

};

export default ExternalEmbedSearchContainer;
