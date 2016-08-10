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
      <main className="two-column_col two-column_col--white-bg">
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
      </main>
    );
  }
}

LearningPathStep.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  learningPathStep: PropTypes.object.isRequired,
  copyPath: PropTypes.func.isRequired,
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  copyPath: copyLearningPath,
};

const mapStateToProps = (state) => Object.assign({}, state, {
  authenticated: state.authenticated,
});


export default connect(mapStateToProps, mapDispatchToProps)(LearningPathStep);
