/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Oembed from './oembed/Oembed';
import polyglot from '../../i18n';
import { fetchLearningPathStep } from './learningPathStepActions';
import LearningPathStepInformation from './LearningPathStepInformation';
import LearningPathStepPrevNext from './LearningPathStepPrevNext';
import { getI18nLearningPathStep } from './learningPathStepSelectors';
import Spinner from '../../common/Spinner';

class LearningPathStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    const { localFetchLearningPathStep, params: { pathId, stepId } } = this.props;
    localFetchLearningPathStep(pathId, stepId).then(() => this.setState({ isLoading: false }));
  }

  componentWillUpdate(nextProps) {
    const { localFetchLearningPathStep, params: { pathId, stepId } } = nextProps;

    if (this.props.params.stepId !== stepId || this.props.params.pathId !== pathId) {
      this.setState({ isLoading: true });
      localFetchLearningPathStep(pathId, stepId).then(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { learningPathStep } = this.props;
    const { lang } = this.context;
    const oembedContent = learningPathStep.oembed;

    return (
      <div className="two-column_content--wide">
        <LearningPathStepPrevNext currentStepId={learningPathStep.id} lang={lang}>
          <Helmet title={polyglot.t('htmlTitleTemplates.learningPathStep', { title: learningPathStep.title || '' })} />
          {this.state.isLoading && <Spinner hasMargins />}
          <LearningPathStepInformation learningPathStep={learningPathStep} stepTitle={learningPathStep.title} />
          {oembedContent ? <Oembed oembedContent={oembedContent} /> : ''}
        </LearningPathStepPrevNext>
      </div>
    );
  }
}

LearningPathStep.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPathStep: PropTypes.object.isRequired,
  localFetchLearningPathStep: PropTypes.func.isRequired,
  params: PropTypes.shape({
    pathId: PropTypes.string.isRequired,
    stepId: PropTypes.string,
  }).isRequired,
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  localFetchLearningPathStep: fetchLearningPathStep,
};

const mapStateToProps = state => Object.assign({}, state, {
  authenticated: state.authenticated,
  learningPathStep: getI18nLearningPathStep(state),
});


export default connect(mapStateToProps, mapDispatchToProps)(LearningPathStep);
