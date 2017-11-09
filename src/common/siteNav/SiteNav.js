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
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import polyglot from '../../i18n';
import LabeledIcon from '../LabeledIcon';
import SiteNavMyPage from './SiteNavMyPage';
import SiteNavSessionAction from './SiteNavSessionAction';
import { closeSidebars } from '../sidebarActions';
import {decodeToken} from "../../util/jwtHelper";

export const SiteNav = ({ authenticated, userName, cssModifier, localCloseSidebars }) => {
  const rootClasses = classNames({
    'site-nav': true,
    [`site-nav--${cssModifier}`]: cssModifier,
  });

  return (
    <div className={rootClasses}>
      <ul className="site-nav_list">
        <li className="site-nav_item">
          <Link to="/learningpaths" className="site-nav_link" onClick={() => localCloseSidebars()}>
            <LabeledIcon.Search labelText={polyglot.t('siteNav.search')} />
          </Link>
        </li>
        <SiteNavMyPage authenticated={authenticated} localCloseSidebars={localCloseSidebars} />
        <SiteNavSessionAction authenticated={authenticated} userName={userName} localCloseSidebars={localCloseSidebars} />
      </ul>
    </div>
  );
};

SiteNav.propTypes = {
  authenticated: PropTypes.bool,
  userName: PropTypes.string,
  localCloseSidebars: PropTypes.func.isRequired,
  cssModifier: PropTypes.string,
};

SiteNav.defaultProps = {
  authenticated: false,
  userName: '',
};


const selectUserName = ({authenticated, idToken}) => authenticated  ? decodeToken(idToken.token)['https://ndla.no/user_name'] : '';

const mapStateToProps = state => Object.assign({}, state, {
  userName: selectUserName(state),
});

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};


export default connect(mapStateToProps, mapDispatchToProps)(SiteNav);
