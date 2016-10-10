/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import polyglot from '../i18n';
import Icon from '../common/Icon';

export function LearningPathDropdown({ onSelect, learningPath }) {
  const makeOnClick = actionType => (evt) => {
    evt.preventDefault();
    onSelect(actionType, learningPath);
  };

  const statuses = [{ status: 'PRIVATE', action: 'unpublish' }, { status: 'PUBLISHED', action: 'publish' }, { status: 'NOT_LISTED', action: 'unlist' }];

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
  return (
    <div className="dropdown-menu">
      <span className="dropdown-menu_icon"><Icon.MoreVert /></span>
      <ul className="dropdown-menu_items">
        <li className="dropdown-menu_item">
          <a href="#" className="dropdown-menu_link" onClick={makeOnClick('makecopy')}>
            <Icon.ContentCopy /> {polyglot.t('pathDropDown.makeCopy')}
          </a>
        </li>
        {statuses.filter(status => status.status !== learningPath.status).map(status =>
          <li key={status.action} className={dropDownMenuItemClassName(status.status)}>
            <a href="#" className="dropdown-menu_link" onClick={publishAction(status)}>
              <Icon.Input /> {polyglot.t(`pathDropDown.${learningPath.status}.${status.action}`)}
            </a>
          </li>
        )}
        <li className="dropdown-menu_item">
          <a href="#" className="dropdown-menu_link" onClick={makeOnClick('delete')}>
            <Icon.Delete /> {polyglot.t('pathDropDown.delete')}
          </a>
        </li>
      </ul>
    </div>
  );
}

LearningPathDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired,
};
