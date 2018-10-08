/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import polyglot from '../i18n';
import Icon from '../common/Icon';
import { learningPathStatuses } from '../learningPath/learningPathUtil';
import ActionToolTip from '../myPage/ActionToolTip';

export default class AdminDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDropDown: false,
    };
  }

  makeOnClick = actionType => evt => {
    const { learningPath, onSelect } = this.props;
    evt.preventDefault();
    onSelect(actionType, learningPath);
  };

  publishAction = status => evt => {
    const { learningPath, onSelect } = this.props;
    evt.preventDefault();
    if (status.status !== learningPath.status) {
      onSelect(status.action, learningPath);
    }
  };

  dropDownMenuItemClassName = status => {
    const { learningPath } = this.props;
    return classNames({
      'dropdown-menu_item': true,
      active: learningPath.status === status,
    });
  };

  handleDropDownOnClick = () => {
    this.setState(prevState => ({
      displayDropDown: !prevState.displayDropDown,
    }));
  };

  handleDropDownOnMouseEvents = displayDropDown => {
    this.setState({ displayDropDown });
  };

  render() {
    const { learningPath } = this.props;

    const dropDownMenuItemsClassName = classNames({
      'dropdown-menu_items': true,
      'dropdown-menu_items_show': this.state.displayDropDown,
    });

    return (
      <div
        className="dropdown-menu"
        onMouseEnter={() => this.handleDropDownOnMouseEvents(true)}
        onMouseLeave={() => this.handleDropDownOnMouseEvents(false)}>
        <button
          type="button"
          className="un-button dropdown-menu_icon"
          onClick={this.handleDropDownOnClick}>
          <Icon.MoreVert />
        </button>
        <ul className={dropDownMenuItemsClassName}>
          {learningPathStatuses[learningPath.status].map(status => (
            <ActionToolTip key={status.action} status={status.status}>
              <li className={this.dropDownMenuItemClassName(status.status)}>
                <button
                  type="button"
                  className="un-button dropdown-menu_link"
                  onClick={this.publishAction(status)}>
                  <Icon.Input />{' '}
                  {polyglot.t(
                    `pathDropDown.${learningPath.status}.${status.action}`,
                  )}
                </button>
              </li>
            </ActionToolTip>
          ))}
        </ul>
      </div>
    );
  }
}

AdminDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired,
};
