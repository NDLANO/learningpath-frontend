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
import classNames from 'classnames';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import { closeSidebars } from '../../common/sidebarActions';
import LabeledIcon from '../../common/LabeledIcon';
import LearningPathTitle from './LearningPathTitle';
import LearningPathActionType from './LearningPathActionType';
import { getLearningPath } from '../learningPathSelectors';
import LearningPathContributors from './LearningPathContributors';

class LearningPathGeneralInfo extends React.Component {
  constructor() {
    super();
    this.state = { isClient: false };
  }
  componentDidMount() {
    this.setState({ isClient: true }); // eslint-disable-line
  }
  render() {
    const {
      authenticated,
      learningPath,
      localCloseSidebars,
      onCopyLearningPathClick,
      changeStatusButton,
    } = this.props;
    const { lang } = this.context;
    const borderBoxClassName = classNames({
      'border-box_wrapper': true,
      'border-box_wrapper--full-width': !authenticated || !this.state.isClient,
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
          <LearningPathTitle learningPath={learningPath} />
          <div className="learningpath-contributors">
            <LearningPathContributors copyright={learningPath.copyright} />
          </div>
          <div className="learningpath-general-info_b">
            <div className={borderBoxClassName}>
              <div className="border-box">
                <LabeledIcon.Today
                  labelText={formatDate(learningPath.lastUpdated, lang)}
                  tagName="time"
                />
              </div>
              <div className="border-box">
                <LabeledIcon.QueryBuilder
                  labelText={formatDuration(learningPath.duration, lang)}
                  tagName="time"
                />
              </div>
            </div>
            {authenticated && this.state.isClient ? actions : ' '}
          </div>
        </div>
      </div>
    );
  }
}

LearningPathGeneralInfo.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
  onCopyLearningPathClick: PropTypes.func.isRequired,
  changeStatusButton: PropTypes.object,
  addStepButton: PropTypes.object,
  pinterestButton: PropTypes.object,
};

LearningPathGeneralInfo.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
  Object.assign({}, state, {
    learningPath: getLearningPath(state),
    authenticated: state.authenticated,
  });

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  LearningPathGeneralInfo,
);
