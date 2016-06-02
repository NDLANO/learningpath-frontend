import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Logo from './Logo';
import SiteNav from './SiteNav';
import Icon from './Icon';
import classNames from 'classnames';
import get from 'lodash/get';

import {
  closeSidebars,
  openLeftSidebar,
  openRightSidebar,
} from '../actions';

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
  const activeButtonClassName = (isLeft, isActive) => classNames({
    active: isActive,
    masthead_button: true,
    'masthead_button--right': !isLeft,
    'masthead_button--left': isLeft,
  });

  const collapseClassName = (isOpen) => classNames({
    'masthead--desktop': true,
    'sidebar--collapsed': !isOpen,
    'sidebar--open': isOpen,
  });

  const overlayClassName = () => classNames({
    'masthead_page-overlay': true,
    'masthead_page-overlay--open': (isLeftSideBarOpen || isRightSidebarOpen)
  });
  const cloneChildren = children ? React.cloneElement(children, {className: activeButtonClassName(true, isLeftSideBarOpen), onClick: () => leftNavButtonClicked()}) : null;

  return (
    <div>
      <div className="masthead">
        <div className="masthead--mobile">
          {cloneChildren}
          {logo}
          <div className={activeButtonClassName(false, isRightSidebarOpen)} onClick={() => rightNavButtonClicked()}>
            <Icon.Menu />
            <span>Meny</span>
          </div>
        </div>
        <div className={collapseClassName(isRightSidebarOpen)}>
          <div className="masthead_left--desktop" onClick={localCloseSidebars}>
            {logo}
          </div>
          <div className="masthead_right--desktop">
            <SiteNav />
          </div>
        </div>
      </div>
      <div className={overlayClassName()} onClick={localCloseSidebars} />
      <div className="masthead--margin-bottom" />
    </div>
  );
}

Masthead.propTypes = {
  children: PropTypes.node,
  logo: PropTypes.object,
  saveButtons: PropTypes.object,
  sortableTableOfContent: PropTypes.object,
  sortLearningSteps: PropTypes.object,
  learningPath: PropTypes.object,
  sortableTableOfContentButton: PropTypes.object,
  isLeftSideBarOpen: PropTypes.bool.isRequired,
  isRightSidebarOpen: PropTypes.bool.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
  openLeft: PropTypes.func.isRequired,
  openRight: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: get(ownProps, 'activePathname', ''),
  saveButtons: get(ownProps, 'saveButtons', null),
  isLeftSideBarOpen: get(state, 'sidebar.isLeftSideBarOpen', false),
  isRightSidebarOpen: get(state, 'sidebar.isRightSidebarOpen', false),
  logo: get(ownProps, 'logo', <Logo />),
});
const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
  openLeft: openLeftSidebar,
  openRight: openRightSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Masthead);
