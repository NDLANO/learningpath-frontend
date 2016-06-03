import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import get from 'lodash/get';

import { titleI18N } from '../../util/i18nFieldFinder';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import { closeSidebars } from '../../actions';
import LabeledIcon from '../LabeledIcon';
import polyglot from '../../i18n';

export function LearningPathGeneralInfo({learningPath, localCloseSidebars}, {lang}) {
  const href = `/learningpaths/${learningPath.id}`;
  const editPathTarget = `/learningpaths/${learningPath.id}/edit`;
  let edit = '';
  if (learningPath.canEdit) {
    edit = (
      <Link className="cta-link cta-link--round edit_learningpath--button" to={editPathTarget} onClick={localCloseSidebars}>{polyglot.t('editPage.edit')}</Link>
    );
  }
  return (
    <div className="learningpath-general-info">
      <h3 className="learningpath-general-info_h">
        <Link to={href} onClick={localCloseSidebars}>{titleI18N(learningPath, lang)}</Link>
      </h3>
      <div className="learningpath-general-info_b">
        <LabeledIcon.Person labelText={get(learningPath, 'author.name')} />
        <LabeledIcon.Today labelText={formatDate(learningPath.lastUpdated, lang)} tagName="time" />
        <LabeledIcon.QueryBuilder labelText={formatDuration(learningPath.duration, lang)} tagName="time" />
      </div>
      {edit}
    </div>
  );
}

LearningPathGeneralInfo.propTypes = {
  learningPath: PropTypes.object.isRequired,
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
