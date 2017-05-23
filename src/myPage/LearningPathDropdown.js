/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import polyglot from '../i18n';
import Icon from '../common/Icon';
import { learningPathStatuses } from '../util/learningPathStatuses';

export function LearningPathDropdown({ onSelect, learningPath }) {
  let dropDownMenuItemsRef;

  const makeOnClick = actionType => (evt) => {
    evt.preventDefault();
    onSelect(actionType, learningPath);
  };


  const publishAction = status => (evt) => {
    evt.preventDefault();
    if (status.status !== learningPath.status) {
      onSelect(status.action, learningPath);
    }
  };

  const dropDownMenuItemClassName = status => classNames({
    'dropdown-menu_item': true,
    active: learningPath.status === status,
  });

  const handleDropDownOnClick = () => {
    const isShowingMenu = dropDownMenuItemsRef.className.includes('dropdown-menu_items_show');

    dropDownMenuItemsRef.className = classNames({
      'dropdown-menu_items': true,
      'dropdown-menu_items_show': !isShowingMenu,
    });
  };

  const handleDropDownOnMouseEnter = () => {
    dropDownMenuItemsRef.className = classNames({
      'dropdown-menu_items': true,
      'dropdown-menu_items_show': true,
    });
  };

  const handleDropDownOnMouseLeave = () => {
    dropDownMenuItemsRef.className = classNames({
      'dropdown-menu_items': true,
      'dropdown-menu_items_show': false,
    });
  };

  return (
    <div className="dropdown-menu" onMouseEnter={() => handleDropDownOnMouseEnter()} onMouseLeave={() => handleDropDownOnMouseLeave()}>
      <button className="un-button dropdown-menu_icon" onClick={() => handleDropDownOnClick()}><Icon.MoreVert /></button>
      <ul className="dropdown-menu_items" ref={(e) => { dropDownMenuItemsRef = e; }}>
        <li className="dropdown-menu_item">
          <button className="un-button dropdown-menu_link" onClick={makeOnClick('makecopy')}>
            <Icon.ContentCopy /> {polyglot.t('pathDropDown.makeCopy')}
          </button>
        </li>
        {learningPathStatuses.filter(status => status.status !== learningPath.status).map(status =>
          <li key={status.action} className={dropDownMenuItemClassName(status.status)}>
            <button className="un-button dropdown-menu_link" onClick={publishAction(status)}>
              <Icon.Input /> {polyglot.t(`pathDropDown.${learningPath.status}.${status.action}`)}
            </button>
          </li>
        )}
        <li className="dropdown-menu_item">
          <button className="un-button dropdown-menu_link" onClick={makeOnClick('delete')}>
            <Icon.Delete /> {polyglot.t('pathDropDown.delete')}
          </button>
        </li>
      </ul>
    </div>
  );
}

LearningPathDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired,
};
