/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableLearningStepList = SortableContainer(
  ({ learningsteps, learningPathId, deleteStep }) => (
    <div className="sortable">
      <div className="sortable_list">
        {learningsteps.map((step, i) => (
          <SortableItem
            key={step.id}
            index={i}
            placeholderClassName="sortable_placeholder"
            step={step}
            learningPathId={learningPathId}
            deleteStep={deleteStep}
          />
        ))}
      </div>
    </div>
  ),
);

SortableLearningStepList.propTypes = {
  learningsteps: PropTypes.array,
  deleteStep: PropTypes.func.isRequired,
  learningPathId: PropTypes.number.isRequired,
};

export default SortableLearningStepList;
