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
import { titleI18N } from '../../util/i18nFieldFinder';
import polyglot from '../../i18n';
import { fetchLearningPathStep } from './learningPathStepActions';
import { copyLearningPath } from '../learningPathActions';
import CopyLearningPath from '../new/CopyLearningPath';
import Lightbox from '../../common/Lightbox';
import LearningPathStepInformation from './LearningPathStepInformation';
import LearningPathStepPrevNext from './LearningPathStepPrevNext';

class LearningPathStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCopyPath: false,
    };
    this.onCopyLearningPathClick = this.onCopyLearningPathClick.bind(this);
  }

  componentWillMount() {
    const { lang } = this.context;
    const { localFetchLearningPathStep, params: { pathId, stepId } } = this.props;
    localFetchLearningPathStep(pathId, stepId, lang);
  }

  componentWillUpdate(nextProps) {
    const { lang } = this.context;
    const { localFetchLearningPathStep, params: { pathId, stepId } } = nextProps;

    if (this.props.params.stepId !== stepId || this.props.params.pathId !== pathId) {
      localFetchLearningPathStep(pathId, stepId, lang);
    }
  }

  onCopyLearningPathClick() {
    this.setState({
      displayCopyPath: true,
    });
  }

  render() {
    const { learningPathStep, learningPath, copyPath } = this.props;
    const { lang } = this.context;
    const stepTitle = titleI18N(learningPathStep, lang, true);
    const oembedContent = learningPathStep.oembed;
    const onLightboxClose = () => this.setState({ displayCopyPath: false });
    const onCopy = () => {
      copyPath(learningPath, lang);
      onLightboxClose();
    };

    return (
      <div className="two-column_content--wide">
        <LearningPathStepPrevNext currentStepId={learningPathStep.id} lang={lang}>
          <Helmet title={polyglot.t('htmlTitleTemplates.learningPathStep', { title: stepTitle || '' })} />
          <LearningPathStepInformation learningPathStep={learningPathStep} stepTitle={stepTitle} />
          {oembedContent ? <Oembed oembedContent={oembedContent} /> : ''}
          <Lightbox display={this.state.displayCopyPath} onClose={onLightboxClose}>
            <CopyLearningPath learningPath={learningPath} onClose={onLightboxClose} onCopy={onCopy} />
          </Lightbox>
        </LearningPathStepPrevNext>
      </div>
    );
  }
}

LearningPathStep.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  learningPathStep: PropTypes.object.isRequired,
  localFetchLearningPathStep: PropTypes.func.isRequired,
  params: PropTypes.shape({
    pathId: PropTypes.string.isRequired,
    stepId: PropTypes.string,
  }).isRequired,
  copyPath: PropTypes.func.isRequired,
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  copyPath: copyLearningPath,
  localFetchLearningPathStep: fetchLearningPathStep,
};

const mapStateToProps = state => Object.assign({}, state, {
  authenticated: state.authenticated,
});


export default connect(mapStateToProps, mapDispatchToProps)(LearningPathStep);
