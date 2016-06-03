import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import get from 'lodash/get';

import { titleI18N } from '../../util/i18nFieldFinder';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import Lightbox from '../Lightbox';
import LabeledIcon from '../LabeledIcon';
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
    const { learningPath, copyPath } = this.props;
    const { lang } = this.context;
    const href = `/learningpaths/${learningPath.id}`;
    const editPathTarget = `/learningpaths/${learningPath.id}/edit`;
    const onCopyLearningPathClick = this.onCopyLearningPathClick.bind(this);
    let onLightboxClose = () => this.setState({displayCopyPath: false});
    const onCopy = () => {
      copyPath(learningPath);
      onLightboxClose();
    };
    let edit = (
      <div className="block-container_fixed block-container_fixed--bottom--right">
        <button className="cta-link cta-link--round cta-link--scale" onClick={onCopyLearningPathClick}>Kopier læringssti</button>
      </div>
    );
    if (learningPath.canEdit) {
      edit = (
        <Link className="cta-link cta-link--round edit_learningpath--button" to={editPathTarget}>{polyglot.t('editPage.edit')}</Link>
      );
    }
    return (
      <div>
        <div className="learningpath-general-info">
          <h3 className="learningpath-general-info_h">
            <Link to={href}>{titleI18N(learningPath, lang)}</Link>
          </h3>
          <div className="learningpath-general-info_b">
            <LabeledIcon.Person labelText={get(learningPath, 'author.name')} />
            <LabeledIcon.Today labelText={formatDate(learningPath.lastUpdated, lang)} tagName="time" />
            <LabeledIcon.QueryBuilder labelText={formatDuration(learningPath.duration, lang)} tagName="time" />
          </div>
          {edit}
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
};

LearningPathGeneralInfo.contextTypes = {
  lang: PropTypes.string.isRequired
};

export const mapStateToProps = state => state;


export default connect(mapStateToProps)(LearningPathGeneralInfo);
