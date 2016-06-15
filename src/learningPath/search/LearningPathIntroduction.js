import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../../components/Icon';
import polyglot from '../../i18n';

import { introductionI18N } from '../../util/i18nFieldFinder';


export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntroduction: false,
    };
  }

  render() {
    const { path } = this.props;
    const { lang } = this.context;

    const onClickShowIntroduction = (evt) => {
      evt.preventDefault();
      this.setState({showIntroduction: !this.state.showIntroduction});
    };

    const introductionClassName = () => classNames({
      'search-result_introduction': true,
      'search-result_introduction--open': this.state.showIntroduction
    });
    const introductionButtonText = this.state.showIntroduction ? polyglot.t('searchForm.hideIntroduction') : polyglot.t('searchForm.showIntroduction');
    return (
      <div>
        <span className="show-introduction_button" onClick={(evt) => onClickShowIntroduction(evt)}>
          {introductionButtonText} {this.state.showIntroduction ? <Icon.ArrowUp /> : <Icon.ArrowDown />}
        </span>
        <div className={introductionClassName()} dangerouslySetInnerHTML={{__html: introductionI18N(path, lang)}}>
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  path: PropTypes.object.isRequired,
};

SearchResult.contextTypes = {
  lang: PropTypes.string.isRequired
};
