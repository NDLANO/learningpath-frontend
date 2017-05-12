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
import { SortableContainer } from 'react-sortable-hoc';
import {
  deleteLearningPathStep,
  sortLearningPathSteps,
} from '../learningPathStepActions';
import SortableItem from './SortableItem';

const SortableLearningStepList = SortableContainer((props, { lang }) => {
  const { learningsteps, deleteStep } = props;

  return (
    <div className="sortable">
      <ul className="sortable_list">
        {learningsteps.map((step, i) =>
          (<SortableItem
            key={step.id}
            index={i}
            placeholderClassName="sortable_placeholder"
            step={step}
            lang={lang}
            deleteStep={deleteStep}
          />)
        )}
      </ul>
    </div>
  );
});

const mapStateToProps = state => state;

export const mapDispatchToProps = {
  sortSteps: sortLearningPathSteps,
  deleteStep: deleteLearningPathStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortableLearningStepList);

SortableLearningStepList.propTypes = {
  sortSteps: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired,
  learningsteps: PropTypes.array,
};

SortableLearningStepList.contextTypes = {
  lang: PropTypes.string.isRequired,
};
