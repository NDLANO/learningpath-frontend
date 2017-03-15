/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IsBasedOn from '../../common/IsBasedOn';
import polyglot from '../../i18n';
import Icon from '../../common/Icon';

class LearningPathTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTitle: false,
      showIsBasedOn: false,
    };
    this.onShowToggle = this.onShowToggle.bind(this);
  }

  onShowToggle(name) {
    this.setState(prevState => ({ [name]: !prevState[name] }));
  }
  render() {
    const { learningPath } = this.props;
    if (!learningPath.title) {
      return null;
    }

    const titleClassName = classNames({
      'learningpath-general-info_title': true,
      'learningpath-general-info_title--open': this.state.showTitle,
    });

    const isBasedOnClassName = classNames({
      'learningpath-general-info_is-basedon': true,
      'learningpath-general-info_is-basedon--open': this.state.showIsBasedOn,
    });

    return (
      <div className="learningpath-general-info_h">
        <div className={titleClassName}>
          <button className="un-button" onClick={() => this.onShowToggle('showTitle')}>
            <h3>
              {learningPath.title}
            </h3>
          </button>
        </div>
        {learningPath.isBasedOn ?
          <div>
            <button className="un-button learningpath-general-info_is-basedon-button" onClick={() => this.onShowToggle('showIsBasedOn')}>
              {this.state.showIsBasedOn ? polyglot.t('learningPath.hideIsBasedOn') : polyglot.t('learningPath.showIsBasedOn')}
              {this.state.showIsBasedOn ? <Icon.ArrowUp /> : <Icon.ArrowDown />}
            </button>
            <div className={isBasedOnClassName}>
              <IsBasedOn path={learningPath} showText={false} />
            </div>
          </div>
        : ''}
      </div>
    );
  }
}

LearningPathTitle.propTypes = {
  learningPath: PropTypes.object,
};

export default LearningPathTitle;
