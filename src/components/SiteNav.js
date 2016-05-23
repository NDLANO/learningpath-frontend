import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import polyglot from '../i18n';

import LabeledIcon from './LabeledIcon';

export function SiteNav({ authenticated, userName, cssModifier }) {
  let myPage;
  let logInOut;

  if (authenticated) {
    myPage = (
      <li className="site-nav_item">
        <Link to="/minside" className="site-nav_link">
          <LabeledIcon.Apps labelText={polyglot.t('siteNav.myPage')} />
        </Link>
      </li>
    );

    logInOut = (
      <li className="site-nav_item">
        <Link to="/logout" className="site-nav_link">
          <LabeledIcon.Exit labelText={polyglot.t('siteNav.logout', {name: userName})} />
        </Link>
      </li>
    );
  } else {
    logInOut = (
      <li className="site-nav_item">
        <Link to="/login" className="site-nav_link">
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
          <Link to="/learningpaths" className="site-nav_link">
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
  cssModifier: PropTypes.string
};

SiteNav.defaultProps = {
  authenticated: false,
  userName: ''
};

const userName = user => [user.first_name, user.middle_name, user.last_name].join(' ');
const selectUserName = state => state.authenticated ? userName(state.user) : '';

const mapStateToProps = (state) => Object.assign({}, state, {
  userName: selectUserName(state)
});

export default connect(mapStateToProps)(SiteNav);
