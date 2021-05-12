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
import { withTracker } from '@ndla/tracker';
import Oembed from './oembed/Oembed';
import { fetchLearningPathStep } from './learningPathStepActions';
import LearningPathStepInformation from './LearningPathStepInformation';
import LearningPathStepPrevNext from './LearningPathStepPrevNext';
import { getLearningPathStep } from './learningPathStepSelectors';
import polyglot from '../../i18n';
import { getPersonalToken } from '../../sources/localStorage';
import { convertToGaOrGtmDimension } from '../../util/trackingUtil';
import { CopyrightObjectShape } from '../../shapes';
import { getScope } from '../../util/jwtHelper';

class LearningPathStep extends React.Component {
  static mapDispatchToProps = {
    localFetchLearningPathStep: fetchLearningPathStep,
  };

  static fetchData(props) {
    const {
      localFetchLearningPathStep,
      match: {
        params: { pathId, stepId },
      },
    } = props;
    return localFetchLearningPathStep(pathId, stepId);
  }

  static willTrackPageView(trackPageView, currentProps) {
    const { learningPath, learningPathStep, match } = currentProps;
    if (
      learningPath &&
      learningPath.id &&
      learningPathStep &&
      learningPathStep.id &&
      learningPathStep.id.toString() === match.params.stepId
    ) {
      trackPageView(currentProps);
    }
  }

  componentDidMount() {
    LearningPathStep.fetchData(this.props);
  }

  componentWillUpdate(nextProps) {
    const {
      localFetchLearningPathStep,
      match: {
        params: { pathId, stepId },
      },
    } = nextProps;
    if (
      process.env.BUILD_TARGET === 'client' &&
      (this.props.match.params.stepId !== stepId ||
        this.props.match.params.pathId !== pathId)
    ) {
      localFetchLearningPathStep(pathId, stepId);
    }
  }

  static getDimensions(props) {
    const { learningPath, learningPathStep } = props;
    const dimensions = {
      13: learningPath.learningsteps.length,
      14: learningPathStep.seqNo + 1,
    };
    return {
      ga: convertToGaOrGtmDimension(dimensions, 'ga'),
      gtm: convertToGaOrGtmDimension(dimensions, 'gtm'),
    };
  }

  static getDocumentTitle(props) {
    const { learningPathStep } = props;
    return learningPathStep.title + polyglot.t('htmlTitles.titleTemplate');
  }

  render() {
    const { learningPathStep, copyright, hasNdlaWriteAccess } = this.props;
    const { lang } = this.context;
    const oembedContent = learningPathStep.oembed;
    return (
      <div className={oembedContent ? 'learning-step--header' : null}>
        <LearningPathStepPrevNext
          currentStepId={learningPathStep.id}
          lang={lang}>
          <div className="two-column_content--wide">
            <Helmet title={this.constructor.getDocumentTitle(this.props)} />
            <LearningPathStepInformation
              copyright={copyright}
              learningPathStep={learningPathStep}
              stepTitle={learningPathStep.title}
              hasNdlaWriteAccess={hasNdlaWriteAccess}
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
  hasNdlaWriteAccess: PropTypes.bool,
  learningPathStep: PropTypes.object.isRequired,
  localFetchLearningPathStep: PropTypes.func.isRequired,
  copyright: CopyrightObjectShape,
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

const mapStateToProps = state => {
  const token = getPersonalToken();
  return Object.assign({}, state, {
    authenticated: state.authenticated,
    hasNdlaWriteAccess: getScope(token).includes('learningpath:write'),
    learningPathStep: getLearningPathStep(state),
  });
};

export default connect(
  mapStateToProps,
  LearningPathStep.mapDispatchToProps,
)(withTracker(LearningPathStep));
