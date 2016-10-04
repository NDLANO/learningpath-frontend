/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import defined from 'defined';
import { Link } from 'react-router';
import classNames from 'classnames';
import LabeledIcon from '../../common/LabeledIcon';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import LearningPathIntroduction from './LearningPathIntroduction';
import polyglot from '../../i18n';

import { titleI18N, descriptionI18N, tagsI18N } from '../../util/i18nFieldFinder';


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
    this.setState({ imageError: true });
  }

  render() {
    const { path, query, pushRoute } = this.props;
    const { lang } = this.context;

    const image = () => {
      if (path.coverPhotoUrl && !this.state.imageError) {
        return <img className="search-result_img" role="presentation" src={path.coverPhotoUrl} onError={this.handleImageError} />;
      }
      return <img className="search-result_img" role="presentation" src={'https://placeholdit.imgix.net/~text?txtsize=33&txt=NDLA&w=190&h=120'} />;
    };

    const tags = defined(tagsI18N(path, lang, true), []);

    const onTagClick = (evt, tag) => {
      evt.preventDefault();
      this.setState({ tag }, () => {
        this.props.onTagSearchQuery(this.state.tag);
      });
    };
    const onSearchResultClick = (evt) => {
      evt.preventDefault();
      pushRoute(`/learningpaths/${path.id}/first-step/`);
    };

    const tagsClassName = (tag) => classNames({
      tag_item: true,
      'tag_item--active': query.tag === tag,
    });

    const isBasedOn = () => {
      if (path.isBasedOn) {
        return (
          <Link className="cta-link--primary cta-link--underline" to={`/learningpaths/${path.isBasedOn}/first-step/`} target="_blank">
            <LabeledIcon.ContentCopy labelText={polyglot.t('learningPath.copy')} tagName="copy" />
          </Link>
        );
      }
      return '';
    };

    return (
      <div>
        <div className="search-result">
          <div role="link" onClick={onSearchResultClick} className="search-result_img_container">
            {image()}
          </div>
          <div className="search-result_bd">
            <h2 role="link" onClick={onSearchResultClick} className="search-result_title">
              {titleI18N(path, lang, true)}
            </h2>
            <div className="search-result_meta">
              <LabeledIcon.Today labelText={formatDate(path.lastUpdated, lang)} tagName="time" />
              <LabeledIcon.QueryBuilder labelText={formatDuration(path.duration, lang)} tagName="time" />
              {isBasedOn()}
            </div>
            <div role="link" onClick={onSearchResultClick} className="search-result_description">{descriptionI18N(path, lang, true)}</div>
            <LearningPathIntroduction path={path} />
            <div className="tags_list">
              {tags.map(tag =>
                <span key={tag} className={tagsClassName(tag)} onClick={(evt) => onTagClick(evt, tag)} href="#">{tag}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  path: PropTypes.object.isRequired,
  onTagSearchQuery: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  pushRoute: PropTypes.func.isRequired,
};

SearchResult.contextTypes = {
  lang: PropTypes.string.isRequired,
};
