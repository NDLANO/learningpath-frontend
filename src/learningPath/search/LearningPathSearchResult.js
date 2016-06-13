import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import LabeledIcon from '../../components/LabeledIcon';
import classNames from 'classnames';
import Icon from '../../components/Icon';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import polyglot from '../../i18n';

import { titleI18N, descriptionI18N, filterFieldsByLanguage, introductionI18N } from '../../util/i18nFieldFinder';


export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageError: false,
      tag: null,
      showIntroduction: false,
    };
    this.handleImageError = this.handleImageError.bind(this);
  }

  handleImageError() {
    this.setState({imageError: true});
  }

  render() {
    const { path, query } = this.props;
    const { lang } = this.context;
    const image = () => {
      if (path.coverPhotoUrl && !this.state.imageError) {
        return <img className="search-result_img" role="presentation" src={path.coverPhotoUrl} onError={this.handleImageError} />;
      }
      return <img className="search-result_img" role="presentation" src={'https://placeholdit.imgix.net/~text?txtsize=33&txt=NDLA&w=190&h=120'} />;
    };
    if (!path.tags) {
      return null;
    }
    const tags = filterFieldsByLanguage(path.tags, lang);
    const onTagClick = (evt, tag) => {
      evt.preventDefault();
      this.setState({tag}, () => {
        this.props.onTagSearchQuery(this.state.tag);
      });
    };
    const onClickShowIntroduction = (evt) => {
      evt.preventDefault();
      this.setState({showIntroduction: !this.state.showIntroduction});
    };

    const tagsClassName = (tag) => classNames({
      'search-result_tag': true,
      'search-result_tag--active': query.tag === tag
    });
    const introductionClassName = () => classNames({
      'search-result_introduction': true,
      'search-result_introduction--open': this.state.showIntroduction
    });
    const introductionButtonText = this.state.showIntroduction ? polyglot.t('searchForm.hideIntroduction') : polyglot.t('searchForm.showIntroduction');
    let learningPathIntro = '';
    if (path.introduction && path.introduction.length > 0) {
      learningPathIntro = (
        <div>
          <span className="show-introduction_button" onClick={(evt) => onClickShowIntroduction(evt)}>
            {introductionButtonText} {this.state.showIntroduction ? <Icon.ArrowUp /> : <Icon.ArrowDown />}
          </span>
          <div className={introductionClassName()} dangerouslySetInnerHTML={{__html: introductionI18N(path, lang)}}>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Link to={`/learningpaths/${path.id}/first-step/`}>
          <div className="search-result">
            <div className="search-result_img_container">
              {image()}
            </div>
            <div className="search-result_bd">
              <h2 className="search-result_title">
                {titleI18N(path, lang)}
              </h2>
              <div className="search-result_meta">
                <LabeledIcon.Today labelText={formatDate(path.lastUpdated, lang)} tagName="time" />
                <LabeledIcon.QueryBuilder labelText={formatDuration(path.duration, lang)} tagName="time" />
              </div>
              <div className="search-result_description">{descriptionI18N(path, lang)}</div>
              {learningPathIntro}
              <div className="search-result_tags">
                {tags.map(tag =>
                  <span key={tag.tag} className={tagsClassName(tag.tag)} onClick={(evt) => onTagClick(evt, tag.tag)} href="#">{tag.tag}</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

SearchResult.propTypes = {
  path: PropTypes.object.isRequired,
  onTagSearchQuery: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

SearchResult.contextTypes = {
  lang: PropTypes.string.isRequired
};
