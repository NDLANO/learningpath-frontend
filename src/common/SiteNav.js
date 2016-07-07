import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import polyglot from '../i18n';

import LabeledIcon from './LabeledIcon';
import { closeSidebars } from '../actions';
export function SiteNav({ authenticated, userName, cssModifier, localCloseSidebars}) {
  let myPage;
  let logInOut;

  if (authenticated) {
    myPage = (
      <li className="site-nav_item">
        <Link to="/minside" className="site-nav_link" onClick={localCloseSidebars}>
          <LabeledIcon.Apps labelText={polyglot.t('siteNav.myPage')} />
        </Link>
      </li>
    );

    logInOut = (
      <li className="site-nav_item">
        <Link to="/logout" className="site-nav_link" onClick={localCloseSidebars}>
          <LabeledIcon.Exit labelText={polyglot.t('siteNav.logout', {name: userName})} />
        </Link>
      </li>
    );
  } else {
    logInOut = (
      <li className="site-nav_item">
        <Link to="/login" className="site-nav_link" onClick={localCloseSidebars}>
          <LabeledIcon.Exit labelText={polyglot.t('siteNav.login')} />
        </Link>
      </li>
    );
  }

  let rootClasses = classNames({
    'site-nav': true,
    [`site-nav--${cssModifier}`]: cssModifier
  });

  return (
    <div className={rootClasses}>
      <ul className="site-nav_list">
        <li className="site-nav_item">
          <Link to="/learningpaths" className="site-nav_link" onClick={localCloseSidebars}>
            <LabeledIcon.Search labelText={polyglot.t('siteNav.search')} />
          </Link>
        </li>
        {myPage}
        {logInOut}
      </ul>
    </div>
  );
}

SiteNav.propTypes = {
  authenticated: PropTypes.bool,
  userName: PropTypes.string,
  localCloseSidebars: PropTypes.func.isRequired,
  cssModifier: PropTypes.string
};

SiteNav.defaultProps = {
  authenticated: false,
  userName: ''
};

const userName = user => [user.first_name, user.middle_name, user.last_name].join(' ');
const selectUserName = (state) => {
  if (state.authenticated) {
    return userName(state.user);
  }
  return '';
};

const mapStateToProps = (state) => Object.assign({}, state, {
  userName: selectUserName(state)
});

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};


export default connect(mapStateToProps, mapDispatchToProps)(SiteNav);
