

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

class SiteNavAdmin extends React.Component {
  constructor() {
    super();
    this.state = { isClient: false };
  }

  componentDidMount() {
    this.setState({ isClient: true }); // eslint-disable-line
  }

  render() {
    const { authenticated, isAdmin, localCloseSidebars } = this.props;
    if (!authenticated || !isAdmin || !this.state.isClient) {
      return null;
    }

    return (
      <li className="site-nav_item">
        <Link
          to="/admin"
          className="site-nav_link"
          onClick={() => localCloseSidebars()}
          data-cy="sitenav-find-paths">
          <LabeledIcon.Person labelText={polyglot.t('siteNav.admin')} />
        </Link>
      </li>
    );
  }
}
SiteNavAdmin.propTypes = {
  authenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  localCloseSidebars: PropTypes.func.isRequired,
};

SiteNavAdmin.defaultProps = {
  authenticated: false,
  isAdmin: false,
};

export default SiteNavAdmin;
