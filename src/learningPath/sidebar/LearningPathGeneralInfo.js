import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import get from 'lodash/get';

import { titleI18N } from '../../util/i18nFieldFinder';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import Lightbox from '../../components/Lightbox';
import { closeSidebars } from '../../actions';
import LabeledIcon from '../../components/LabeledIcon';
import polyglot from '../../i18n';
import CopyLearningPath from '../../learningPath/new/CopyLearningPath';
class LearningPathGeneralInfo extends React.Component {
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
    const { learningPath, copyPath, localCloseSidebars } = this.props;
    const { lang } = this.context;
    const href = `/learningpaths/${learningPath.id}`;
    const editPathTarget = `/learningpaths/${learningPath.id}/edit`;
    const onCopyLearningPathClick = this.onCopyLearningPathClick.bind(this);
    let onLightboxClose = () => this.setState({displayCopyPath: false});
    const onCopy = () => {
      copyPath(learningPath, lang);
      onLightboxClose();
    };
    const copy = (
      <button className="cta-link cta-link--round edit_learningpath--button" onClick={onCopyLearningPathClick}>{polyglot.t('copyLearningPath.createCopy')}</button>
    );
    return (
      <div>
        <div className="learningpath-general-info">
          <h3 className="learningpath-general-info_h">
            <Link to={href} onClick={localCloseSidebars}>{titleI18N(learningPath, lang)}</Link>
          </h3>
          <div className="learningpath-general-info_b">
            <LabeledIcon.Person labelText={get(learningPath, 'author.name')} />
            <LabeledIcon.Today labelText={formatDate(learningPath.lastUpdated, lang)} tagName="time" />
            <LabeledIcon.QueryBuilder labelText={formatDuration(learningPath.duration, lang)} tagName="time" />
          </div>
          {learningPath.canEdit ? <Link className="cta-link cta-link--round edit_learningpath--button" to={editPathTarget} onClick={localCloseSidebars}>{polyglot.t('editPage.edit')}</Link> : copy}
        </div>
        <Lightbox display={this.state.displayCopyPath} onClose={onLightboxClose}>
          <CopyLearningPath learningPath={learningPath} onClose={onLightboxClose} onCopy={onCopy} />
        </Lightbox>
      </div>
    );
  }
}

LearningPathGeneralInfo.propTypes = {
  learningPath: PropTypes.object.isRequired,
  copyPath: PropTypes.func.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
};

LearningPathGeneralInfo.contextTypes = {
  lang: PropTypes.string.isRequired
};

export const mapStateToProps = state => state;

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathGeneralInfo);
