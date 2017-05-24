/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import polyglot from '../../i18n';
import LabeledIcon from '../LabeledIcon';

export const SiteNavSessionAction = ({ authenticated, userName, localCloseSidebars }) => {
  if (authenticated) {
    return (
      <li className="site-nav_item">
        <Link to="/logout" className="site-nav_link" onClick={() => localCloseSidebars()}>
          <LabeledIcon.Exit labelText={polyglot.t('siteNav.logout', { name: userName })} />
        </Link>
      </li>
    );
  }
  return (
    <li className="site-nav_item">
      <Link to="/login" className="site-nav_link" onClick={() => localCloseSidebars()}>
        <LabeledIcon.Exit labelText={polyglot.t('siteNav.login')} />
      </Link>
    </li>
  );
};

SiteNavSessionAction.propTypes = {
  authenticated: PropTypes.bool,
  userName: PropTypes.string,
  localCloseSidebars: PropTypes.func.isRequired,
};

SiteNavSessionAction.defaultProps = {
  authenticated: false,
  userName: '',
};


export default SiteNavSessionAction;
