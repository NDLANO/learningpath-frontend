/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLearningPath } from '../learningPathSelectors';

const LearningPathSummary = ({ learningPath }) => {
  if (!learningPath) {
    return null;
  }
  return (
    <div className="two-column_content">
      <div className="learning-path">
        <div className="learning-path_hd">
          <h1 className="learning-path_title">{learningPath.title}</h1>
        </div>
        <div className="learning-path_bd">
          <div>{learningPath.description}</div>
        </div>
      </div>
    </div>
  );
};

LearningPathSummary.propTypes = {
  learningPath: PropTypes.object,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    learningPath: getLearningPath(state),
  });

export default connect(mapStateToProps)(LearningPathSummary);
