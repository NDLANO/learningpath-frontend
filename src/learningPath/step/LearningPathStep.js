/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import Oembed from './oembed/Oembed';
import { titleI18N, descriptionI18N } from '../../util/i18nFieldFinder';
import polyglot from '../../i18n';
import Icon from '../../common/Icon';
import { fetchLearningPathStep } from './learningPathStepActions';
import { copyLearningPath } from '../learningPathActions';
import CopyLearningPath from '../new/CopyLearningPath';
import Lightbox from '../../common/Lightbox';

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
    const { authenticated, learningPathStep, learningPath, copyPath } = this.props;
    const { lang } = this.context;
    const stepTitle = titleI18N(learningPathStep, lang, true);
    const stepDescription = descriptionI18N(learningPathStep, lang, true);
    const oembedContent = learningPathStep.oembed;
    const editStepTarget = `/learningpaths/${learningPath.id}/step/${learningPathStep.id}/edit`;
    let onLightboxClose = () => this.setState({ displayCopyPath: false });
    const onCopy = () => {
      copyPath(learningPath, lang);
      onLightboxClose();
    };
    const edit = (
      <div className="block-container_fixed block-container_fixed--bottom--right">
        {learningPath.canEdit ? <Link className="cta-link cta-link--round cta-link--scale" to={editStepTarget}><Icon.Create /> {polyglot.t('editPathStep.edit')}</Link> :
          <button className="cta-link cta-link--round cta-link--scale" onClick={this.onCopyLearningPathClick}>{polyglot.t('copyLearningPath.createCopy')}</button>}
      </div>
      );
    const license = learningPathStep.license && learningPathStep.license.license ? (
      <p className="learning-step_license">
        {learningPathStep.license.url ?
          <a target="_blank" rel="noopener noreferrer" href={learningPathStep.license.url}>{polyglot.t('learningPathStep.license', { license: learningPathStep.license.license })}</a>
        : polyglot.t('learningPathStep.license', { license: learningPathStep.license.license })}
      </p>
    ) : '';
    return (
      <div className="two-column_content--wide">
        <Helmet title={polyglot.t('htmlTitleTemplates.learningPathStep', { title: stepTitle || '' })} />
        <div className="learning-step">
          {learningPathStep.showTitle ? (
            <div className="learning-step_hd">
              <h1 className="learning-step_title">{stepTitle}</h1>
              {license}
            </div>
          ) : null}
          <div className="learning-step_bd" dangerouslySetInnerHTML={{ __html: stepDescription }} />
        </div>
        {oembedContent ? <Oembed oembedContent={oembedContent} /> : ''}
        {authenticated ? edit : null}
        <Lightbox display={this.state.displayCopyPath} onClose={onLightboxClose}>
          <CopyLearningPath learningPath={learningPath} onClose={onLightboxClose} onCopy={onCopy} />
        </Lightbox>
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

const mapStateToProps = (state) => Object.assign({}, state, {
  authenticated: state.authenticated,
});


export default connect(mapStateToProps, mapDispatchToProps)(LearningPathStep);
