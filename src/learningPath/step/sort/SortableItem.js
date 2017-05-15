/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import Icon from '../../../common/Icon';
import { titleI18N } from '../../../util/i18nFieldFinder';
import { deleteLearningPathStep } from '../learningPathStepActions';

const SortableItem = SortableElement(({ deleteStep, step, learningPathId, lang }) => {
  return (
    <li className="sortable_item">
      <div className="sortable_handle">
        <Icon.ImportExport className="icon--m" />
      </div>
      <div className="sortable_title">
        {titleI18N(step, lang, true)}
      </div>
      <div className="sortable_action">
        <button onClick={() => deleteStep(learningPathId, step.id, titleI18N(step, lang, true))} className="un-button">
          <Icon.Clear className="icon--m" />
        </button>
      </div>
    </li>
  );
});

SortableItem.propTypes = {
  index: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired,
  learningPathId: PropTypes.number.isRequired,
  deleteStep: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {

});

const mapDispatchToProps = {
  deleteStep: deleteLearningPathStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortableItem);
