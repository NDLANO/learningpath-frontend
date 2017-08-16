/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import Icon from '../../../common/Icon';

const SortableItem = SortableElement(({ deleteStep, step, learningPathId }) => (
  <li className="sortable_item">
    <div className="sortable_handle">
      <Icon.ImportExport className="icon--m" />
    </div>
    <div className="sortable_title">
      {step.title.title}
    </div>
    <div className="sortable_action">
      <button onClick={() => deleteStep(learningPathId, step.id, step.title.title)} className="un-button">
        <Icon.Clear className="icon--m" />
      </button>
    </div>
  </li>
  ));

SortableItem.propTypes = {
  index: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired,
  learningPathId: PropTypes.number.isRequired,
  deleteStep: PropTypes.func.isRequired,
};


export default SortableItem;
