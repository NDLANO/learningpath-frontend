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
import get from 'lodash/get';

import Logo from './Logo';
import SiteNav from './siteNav/SiteNav';
import Icon from './Icon';

import {
  closeSidebars,
  openLeftSidebar,
  openRightSidebar,
} from './sidebarActions';

export function Masthead(props) {
  const {
    isRightSidebarOpen,
    isLeftSideBarOpen,
    localCloseSidebars,
    openRight,
    openLeft,
    children,
    logo,
  } = props;
  const leftNavButtonClicked = () => {
    if (isLeftSideBarOpen) {
      localCloseSidebars();
    } else {
      openLeft();
    }
  };
  const rightNavButtonClicked = () => {
    if (isRightSidebarOpen) {
      localCloseSidebars();
    } else {
      openRight();
    }
  };
  const activeButtonClassName = (isLeft, isActive) =>
    classNames({
      active: isActive,
      masthead_button: true,
      'un-button': true,
      'masthead_button--right': !isLeft,
      'masthead_button--left': isLeft,
    });

  const collapseClassName = isOpen =>
    classNames({
      'masthead--desktop': true,
      'sidebar--collapsed': !isOpen,
      'sidebar--open': isOpen,
    });

  const mastheadPageOverlay =
    isLeftSideBarOpen || isRightSidebarOpen ? (
      <button
        className="masthead_page-overlay"
        onClick={() => localCloseSidebars()}
      />
    ) : (
      ''
    );

  const cloneChildren = children
    ? React.cloneElement(children, {
        className: activeButtonClassName(true, isLeftSideBarOpen),
        onClick: () => leftNavButtonClicked(),
      })
    : null;

  return (
    <div className="masthead_wrapper">
      <div className="masthead">
        <div className="masthead--mobile">
          {cloneChildren}
          {logo}
          <button
            className={activeButtonClassName(false, isRightSidebarOpen)}
            onClick={() => rightNavButtonClicked()}>
            <Icon.Menu />
            <span>Meny</span>
          </button>
        </div>
        <div className={collapseClassName(isRightSidebarOpen)}>
          <div className="masthead_left--desktop">{logo}</div>
          <div className="masthead_right--desktop">
            <SiteNav />
          </div>
        </div>
      </div>
      {mastheadPageOverlay}
      <div className="masthead--margin-bottom" />
    </div>
  );
}

Masthead.propTypes = {
  children: PropTypes.node,
  logo: PropTypes.object,
  changeStatusButton: PropTypes.object,
  sortableTableOfContent: PropTypes.object,
  learningPath: PropTypes.object,
  sortableTableOfContentButton: PropTypes.object,
  isLeftSideBarOpen: PropTypes.bool.isRequired,
  isRightSidebarOpen: PropTypes.bool.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
  openLeft: PropTypes.func.isRequired,
  openRight: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, state, {
    learningPath: state.learningPath,
    changeStatusButton: get(ownProps, 'changeStatusButton', null),
    isLeftSideBarOpen: get(state, 'sidebar.isLeftSideBarOpen', false),
    isRightSidebarOpen: get(state, 'sidebar.isRightSidebarOpen', false),
    logo: get(ownProps, 'logo', <Logo beta />),
  });
const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
  openLeft: openLeftSidebar,
  openRight: openRightSidebar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Masthead);
