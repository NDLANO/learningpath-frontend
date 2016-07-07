import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { titleI18N } from '../../util/i18nFieldFinder';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import Lightbox from '../../common/Lightbox';
import { closeSidebars } from '../../actions';
import LabeledIcon from '../../common/LabeledIcon';
import polyglot from '../../i18n';
import CopyLearningPath from '../../learningPath/new/CopyLearningPath';
class LearningPathGeneralInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCopyPath: false
    };
    this.onCopyLearningPathClick = this.onCopyLearningPathClick.bind(this);
  }

  onCopyLearningPathClick() {
    this.setState({
      displayCopyPath: true
    });
  }

  renderAction() {
    const { authenticated, learningPath, localCloseSidebars } = this.props;
    const classNames = 'cta-link cta-link--round edit_learningpath--button';
    if (learningPath.canEdit) {
      const editPathTarget = `/learningpaths/${learningPath.id}/edit`;
      return <Link className={classNames} to={editPathTarget} onClick={localCloseSidebars}>{polyglot.t('editPage.edit')}</Link>;
    } else if (authenticated) {
      return <button className={classNames} onClick={this.onCopyLearningPathClick}>{polyglot.t('copyLearningPath.createCopy')}</button>;
    }
    return null;
  }

  render() {
    const { learningPath, copyPath, localCloseSidebars } = this.props;
    const { lang } = this.context;
    const href = `/learningpaths/${learningPath.id}`;
    let onLightboxClose = () => this.setState({displayCopyPath: false});
    const onCopy = () => {
      copyPath(learningPath, lang);
      onLightboxClose();
    };

    return (
      <div>
        <div className="learningpath-general-info">
          <h3 className="learningpath-general-info_h">
            <Link to={href} onClick={localCloseSidebars}>{titleI18N(learningPath, lang, true)}</Link>
          </h3>
          <div className="learningpath-general-info_b">
            <LabeledIcon.Today labelText={formatDate(learningPath.lastUpdated, lang)} tagName="time" />
            <LabeledIcon.QueryBuilder labelText={formatDuration(learningPath.duration, lang)} tagName="time" />
          </div>
          {this.renderAction()}
        </div>
        <Lightbox display={this.state.displayCopyPath} onClose={onLightboxClose}>
          <CopyLearningPath learningPath={learningPath} onClose={onLightboxClose} onCopy={onCopy} />
        </Lightbox>
      </div>
    );
  }
}

LearningPathGeneralInfo.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  copyPath: PropTypes.func.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
};

LearningPathGeneralInfo.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state) => Object.assign({}, state, {
  authenticated: state.authenticated
});

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathGeneralInfo);
