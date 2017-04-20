/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../common/Icon';
import polyglot from '../../i18n';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntroduction: false,
    };
  }

  render() {
    const { path } = this.props;
    if (!path.introduction) {
      return null;
    }
    const onClickShowIntroduction = (evt) => {
      evt.preventDefault();
      this.setState({ showIntroduction: !this.state.showIntroduction });
    };

    const introductionClassName = () => classNames({
      'search-result_introduction': true,
      'search-result_introduction--open': this.state.showIntroduction,
    });
    const introductionButtonText = this.state.showIntroduction ? polyglot.t('searchForm.hideIntroduction') : polyglot.t('searchForm.showIntroduction');
    // path.introduction && path.introduction.length > 0 ?
    return (
      <div>
        <button className="un-button show-introduction_button" onClick={onClickShowIntroduction}>
          {introductionButtonText} {this.state.showIntroduction ? <Icon.ArrowUp /> : <Icon.ArrowDown />}
        </button>
        <div className={introductionClassName()} dangerouslySetInnerHTML={{ __html: path.introduction }} />
      </div>
    );
  }
}

SearchResult.propTypes = {
  path: PropTypes.object.isRequired,
};
