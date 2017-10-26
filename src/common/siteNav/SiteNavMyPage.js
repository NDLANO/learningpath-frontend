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

class SiteNavMyPage extends React.Component {
  constructor() {
    super();
    this.state = { isClient: false };
  }

  componentDidMount() {
    this.setState({isClient: true}); // eslint-disable-line
  }

  render(){
    const { authenticated, localCloseSidebars } = this.props;
    if (!authenticated || !this.state.isClient) {
      return null;
    }

    return (
      <li className="site-nav_item">
        <Link to="/minside" className="site-nav_link" onClick={() => localCloseSidebars()}>
          <LabeledIcon.Apps labelText={polyglot.t('siteNav.myPage')} />
        </Link>
      </li>
    );
  }
}
SiteNavMyPage.propTypes = {
  authenticated: PropTypes.bool,
  localCloseSidebars: PropTypes.func.isRequired,
};

SiteNavMyPage.defaultProps = {
  authenticated: false,
};

export default SiteNavMyPage;
