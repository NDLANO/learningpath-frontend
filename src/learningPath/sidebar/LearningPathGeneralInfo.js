/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import { closeSidebars } from '../../common/sidebarActions';
import LabeledIcon from '../../common/LabeledIcon';
import IsBasedOn from '../../common/IsBasedOn';
import LearningPathActionType from './LearningPathActionType';
import { getI18nLearningPath } from '../learningPathSelectors';
import LearningPathContributors from './LearningPathContributors';

const LearningPathGeneralInfo = (props, context) => {
  const { authenticated, learningPath, localCloseSidebars, onCopyLearningPathClick, changeStatusButton, addStepButton } = props;
  const { lang } = context;
  const borderBoxClassName = classNames({
    'border-box_wrapper': true,
    'border-box_wrapper--full-width': !authenticated,
  });
  const actions = (
    <div className="learningpath-general-actions">
      {changeStatusButton}
      <LearningPathActionType
        hasChangeStatusButton={changeStatusButton !== null}
        authenticated={authenticated}
        learningPath={learningPath}
        localCloseSidebars={localCloseSidebars}
        onCopyLearningPathClick={onCopyLearningPathClick}
      />
    </div>
  );

  return (
    <div>
      <div className="learningpath-general-info">
        <div className="learningpath-general-info_h">
          <h3>
            {learningPath.title}
          </h3>
          {learningPath.isBasedOn ? <IsBasedOn path={learningPath} /> : '' }
        </div>
        <div className="learningpath-contributors">
          <LearningPathContributors copyright={learningPath.copyright} />
        </div>
        <div className="learningpath-general-info_b">
          <div className={borderBoxClassName}>
            <div className="border-box border-box--block">
              <LabeledIcon.Today labelText={formatDate(learningPath.lastUpdated, lang)} tagName="time" />
            </div>
            <div className="border-box border-box--block">
              <LabeledIcon.QueryBuilder labelText={formatDuration(learningPath.duration, lang)} tagName="time" />
            </div>
          </div>
          { authenticated ? actions : ' '}
        </div>
        {addStepButton}
      </div>
    </div>
  );
};

LearningPathGeneralInfo.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
  onCopyLearningPathClick: PropTypes.func.isRequired,
  changeStatusButton: PropTypes.object,
  addStepButton: PropTypes.object,
};

LearningPathGeneralInfo.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: getI18nLearningPath(state),
  authenticated: state.authenticated,
});

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathGeneralInfo);
