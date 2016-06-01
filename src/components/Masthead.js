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
    closeBothSidebars,
    openRight,
    openLeft,
    children,
    logo,
  } = props;
  const leftNavButtonClicked = () => {
    if (isLeftSideBarOpen) {
      closeBothSidebars();
    } else {
      openLeft();
    }
  };
  const rightNavButtonClicked = () => {
    if (isRightSidebarOpen) {
      closeBothSidebars();
    } else {
      openRight();
    }
  };
  const activeButtonClassName = (isLeft, isActive) => classNames({
    active: isActive,
    'masthead-button--right': !isLeft,
    'masthead-button--left': isLeft,
  });

  const collapseClassName = (isOpen) => classNames({
    'masthead--desktop': true,
    collapsed: !isOpen,
    in: isOpen,
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
          <div className="masthead-left--desktop" onClick={closeBothSidebars}>
            {logo}
          </div>
          <div className="masthead-right--desktop">
            <SiteNav />
          </div>
        </div>
      </div>
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
  closeBothSidebars: PropTypes.func.isRequired,
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
  closeBothSidebars: closeSidebars,
  openLeft: openLeftSidebar,
  openRight: openRightSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Masthead);
