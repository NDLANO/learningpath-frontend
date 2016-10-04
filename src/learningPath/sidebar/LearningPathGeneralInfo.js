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

import { titleI18N } from '../../util/i18nFieldFinder';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import { closeSidebars } from '../../common/sidebarActions';
import LabeledIcon from '../../common/LabeledIcon';
import polyglot from '../../i18n';
import LearningPathCopyright from './LearningPathCopyright';

const LearningPathGeneralInfo = (props, context) => {
  const { authenticated, learningPath, localCloseSidebars, onCopyLearningPathClick } = props;
  const { lang } = context;
  const href = `/learningpaths/${learningPath.id}`;

  const renderAction = () => {
    const classNames = 'cta-link cta-link--round edit_learningpath--button';
    if (learningPath.canEdit) {
      const editPathTarget = `/learningpaths/${learningPath.id}/edit`;
      return <Link className={classNames} to={editPathTarget} onClick={localCloseSidebars}>{polyglot.t('editPage.edit')}</Link>;
    } else if (authenticated) {
      return <button className={classNames} onClick={onCopyLearningPathClick}>{polyglot.t('copyLearningPath.createCopy')}</button>;
    }
    return null;
  };
  const isBasedOn = () => {
    if (learningPath.isBasedOn) {
      return (
        <Link to={`/learningpaths/${learningPath.isBasedOn}/first-step/`} target="_blank" rel="noopener noreferrer" >
          <LabeledIcon.ContentCopy labelText={polyglot.t('learningPath.copy')} tagName="copy" />
        </Link>
      );
    }
    return '';
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
          <LearningPathCopyright copyright={learningPath.copyright} />
          {isBasedOn()}
        </div>
        {renderAction()}
      </div>
    </div>
  );
};

LearningPathGeneralInfo.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
  onCopyLearningPathClick: PropTypes.func.isRequired,
};

LearningPathGeneralInfo.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
  authenticated: state.authenticated,
});

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathGeneralInfo);
