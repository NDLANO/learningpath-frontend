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

class LTISearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
    this.toggleGoogleCustomSearch = this.toggleGoogleCustomSearch.bind(this);
  }

  toggleGoogleCustomSearch(evt) {
    evt.preventDefault();
    this.setState({ active: !this.state.active });
  }

  render() {
    const containerClass = {
      'embed-search_container': true,
      'embed-search_container--active': this.state.active,
    };
    const query = {};

    return (
      <div>
        <button className="button button--primary button--block embed-search_open-button" onClick={this.toggleGoogleCustomSearch}>Søk i LTI</button>
        <div className={classNames(containerClass)}>
          <p>halla</p>
        </div>
      </div>
    );
  }
}


LTISearch.propTypes = {
};

LTISearch.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default LTISearch;
