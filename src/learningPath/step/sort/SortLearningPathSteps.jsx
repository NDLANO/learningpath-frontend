/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SortableLearningStepList from './SortableLearningStepList';
import polyglot from '../../../i18n';
import { getLearningPath } from '../../learningPathSelectors';
import {
  updateStepSequenceNumber,
} from '../learningPathStepActions';

class SortLearningPathSteps extends Component {

  constructor(props) {
    super();
    this.state = {
      items: props.learningPath && props.learningPath.learningsteps ? props.learningPath.learningsteps : [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.items);
  }

  onSortEnd = (indexes) => {
    console.log(indexes);
    const learningsteps = this.props.learningPath.learningsteps;

    const step = learningsteps[indexes.oldIndex];

    console.log(indexes.newIndex);
    if (step) {
      console.log('Dispatching new index!');
      this.props.localUpdateStepSequenceNumber(this.props.learningPath.id, step.id, indexes.newIndex);
    }
  }

  render() {
    const { learningPath } = this.props;

    return (
      <div>
        {(learningPath && learningPath.learningsteps && learningPath.id) ? <SortableLearningStepList learningPathId={learningPath.id} learningsteps={this.state.items} onSortEnd={this.onSortEnd} /> : null}
        <ul className="vertical-menu">
          <li>
            <Link className="cta-link cta-link--block" to={`/learningpaths/${learningPath.id}`}>
              {polyglot.t('sortSteps.finish')}
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}


SortLearningPathSteps.propTypes = {
  learningPath: PropTypes.object.isRequired,
  localUpdateStepSequenceNumber: PropTypes.func.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: getLearningPath(state),
});

const mapDispatchToProps = {
  localUpdateStepSequenceNumber: updateStepSequenceNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortLearningPathSteps);
