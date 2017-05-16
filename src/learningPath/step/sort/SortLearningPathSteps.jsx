/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  arrayMove,
} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SortableLearningStepList from './SortableLearningStepList';
import polyglot from '../../../i18n';
import { getLearningPath } from '../../learningPathSelectors';
import { updateStepSequenceNumber, deleteLearningPathStep } from '../learningPathStepActions';

class SortLearningPathSteps extends Component {

  constructor(props) {
    super();
    this.state = {
      items: props.learningPath && props.learningPath.learningsteps ? props.learningPath.learningsteps : [],
      loading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { learningPath } = nextProps;
    if (this.state.loading || learningPath.learningsteps.length !== this.state.items.length) {
      this.setState({ items: learningPath.learningsteps, loading: false });
    }
  }

  onSortEnd = (indexes) => {
    const learningsteps = this.props.learningPath.learningsteps;

    const step = learningsteps[indexes.oldIndex];

    if (step && (indexes.oldIndex !== indexes.newIndex)) {
      this.setState(prevState => ({
        items: arrayMove(prevState.items, indexes.oldIndex, indexes.newIndex),
        loading: true,
      }));
      this.props.localUpdateStepSequenceNumber(this.props.learningPath.id, step.id, indexes.newIndex);
    }
  }
  shouldCancelStart = (e) => {
    for (let target = e.target; target !== this.contentDiv; target = target.parentElement) {
      if (target && target.tagName.toLowerCase() === 'button') {
        return true;
      }
    }
    return false;
  }

  render() {
    const { learningPath, lang, deleteStep } = this.props;
    return (
      <div ref={((contentDiv) => { this.contentDiv = contentDiv; })}>
        {(learningPath && learningPath.learningsteps && learningPath.id) ?
          <SortableLearningStepList
            learningPathId={learningPath.id}
            learningsteps={this.state.items}
            onSortEnd={this.onSortEnd}
            lang={lang}
            shouldCancelStart={this.shouldCancelStart}
            deleteStep={deleteStep}
          /> : null}
        <ul className="vertical-menu" >
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
  deleteStep: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: getLearningPath(state),
});

const mapDispatchToProps = {
  localUpdateStepSequenceNumber: updateStepSequenceNumber,
  deleteStep: deleteLearningPathStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortLearningPathSteps);
