import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import Oembed from './oembed/Oembed';
import { titleI18N, descriptionI18N, oembedContentI18N } from '../../util/i18nFieldFinder';
import polyglot from '../../i18n';
import Icon from '../../components/Icon';
import { copyLearningPath } from '../../actions';
import CopyLearningPath from '../new/CopyLearningPath';
import Lightbox from '../../components/Lightbox';
class LearningPathStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCopyPath: false
    };
  }

  onCopyLearningPathClick() {
    this.setState({
      displayCopyPath: true
    });
  }

  render() {
    const {learningPathStep, learningPath, copyPath} = this.props;
    const {lang} = this.context;
    const stepTitle = titleI18N(learningPathStep, lang);
    const stepDescription = descriptionI18N(learningPathStep, lang);
    const oembedContent = oembedContentI18N(learningPathStep, lang);
    const editStepTarget = `/learningpaths/${learningPath.id}/step/${learningPathStep.id}/edit`;
    const onCopyLearningPathClick = this.onCopyLearningPathClick.bind(this);
    let onLightboxClose = () => this.setState({displayCopyPath: false});
    const onCopy = () => {
      copyPath(learningPath, lang);
      onLightboxClose();
    };
    let edit = (
      <div className="block-container_fixed block-container_fixed--bottom--right">
        {learningPath.canEdit ? <Link className="cta-link cta-link--round cta-link--scale" to={editStepTarget}><Icon.Create /> {polyglot.t('editPathStep.edit')}</Link> :
          <button className="cta-link cta-link--round cta-link--scale" onClick={onCopyLearningPathClick}>{polyglot.t('copyLearningPath.createCopy')}</button>}
      </div>
      );
    return (
      <main className="two-column_col two-column_col--white-bg">
        <Helmet title={polyglot.t('htmlTitleTemplates.learningPathStep', {title: stepTitle || ''})} />
        <div className="learning-step">
          {learningPathStep.showTitle ? (
            <div className="learning-step_hd">
              <h1 className="learning-step_title">{stepTitle}</h1>
            </div>
          ) : null}
          <div className="learning-step_bd" dangerouslySetInnerHTML={{__html: stepDescription}} />
        </div>
        <Oembed oembedContent={oembedContent} />
        {edit}
        <Lightbox display={this.state.displayCopyPath} onClose={onLightboxClose}>
          <CopyLearningPath learningPath={learningPath} onClose={onLightboxClose} onCopy={onCopy} />
        </Lightbox>
      </main>
    );
  }
}

LearningPathStep.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningPathStep: PropTypes.object.isRequired,
  copyPath: PropTypes.func.isRequired,
};

LearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapDispatchToProps = {
  copyPath: copyLearningPath,
};
export default connect(state => state, mapDispatchToProps)(LearningPathStep);
