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
import Helmet from 'react-helmet';
import Oembed from './oembed/Oembed';
import polyglot from '../../i18n';
import { fetchLearningPathStep } from './learningPathStepActions';
import LearningPathStepInformation from './LearningPathStepInformation';
import LearningPathStepPrevNext from './LearningPathStepPrevNext';
import { getLearningPathStep } from './learningPathStepSelectors';

class LearningPathStep extends React.Component {
  static mapDispatchToProps = {
    localFetchLearningPathStep: fetchLearningPathStep,
  };

  static fetchData(props) {
    const {
      localFetchLearningPathStep,
      match: { params: { pathId, stepId } },
    } = props;
    return localFetchLearningPathStep(pathId, stepId);
  }

  componentWillMount() {
    LearningPathStep.fetchData(this.props);
  }

  componentWillUpdate(nextProps) {
    const {
      localFetchLearningPathStep,
      match: { params: { pathId, stepId } },
    } = nextProps;
    if (
      __CLIENT__ &&
      (this.props.match.params.stepId !== stepId ||
        this.props.match.params.pathId !== pathId)
    ) {
      localFetchLearningPathStep(pathId, stepId);
    }
  }

  render() {
    const { learningPathStep } = this.props;
    const { lang } = this.context;
    const oembedContent = learningPathStep.oembed;
    return (
      <div className={oembedContent ? 'learning-step--header' : null}>
        <LearningPathStepPrevNext
          currentStepId={learningPathStep.id}
          lang={lang}>
          <div className="two-column_content--wide">
            <Helmet
              title={polyglot.t('htmlTitleTemplates.learningPathStep', {
                title: learningPathStep.title || '',
              })}
            />
            <LearningPathStepInformation
              learningPathStep={learningPathStep}
              stepTitle={learningPathStep.title}
            />
            {oembedContent ? <Oembed oembedContent={oembedContent} /> : ''}
          </div>
        </LearningPathStepPrevNext>
      </div>
    );
  }
}

LearningPathStep.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPathStep: PropTypes.object.isRequired,
  localFetchLearningPathStep: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pathId: PropTypes.string.isRequired,
      stepId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    authenticated: state.authenticated,
    learningPathStep: getLearningPathStep(state),
  });

export default connect(mapStateToProps, LearningPathStep.mapDispatchToProps)(
  LearningPathStep,
);
