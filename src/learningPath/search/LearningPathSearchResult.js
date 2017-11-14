/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import LabeledIcon from '../../common/LabeledIcon';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import LearningPathIntroduction from './LearningPathIntroduction';
import IsBasedOn from '../../common/IsBasedOn';
import LearningPathContributors from '../sidebar/LearningPathContributors';
import { scaleImage } from '../../util/imageScaler';
import requireAssets from '../../util/requireAssets';

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
    const { path, query } = this.props;
    const { lang } = this.context;
    const image = () => {
      if (path.coverPhotoUrl && !this.state.imageError) {
        return (
          <img
            className="search-result_img"
            role="presentation"
            src={scaleImage(path.coverPhotoUrl)}
            onError={this.handleImageError}
            alt={path.title}
          />
        );
      }
      return (
        <img
          className="search-result_img"
          role="presentation"
          src={`/assets/${requireAssets['placeholder.png']}`}
          alt="placeholder"
        />
      );
    };

    const tags = path.tags;
    const onTagClick = (evt, tag) => {
      evt.preventDefault();
      this.setState({ tag }, () => {
        this.props.onTagSearchQuery(this.state.tag);
      });
    };

    const tagsClassName = tag =>
      classNames({
        tag_item: true,
        'un-button': true,
        'tag_item--active': query.tag === tag,
      });

    return (
      <div className="search-result">
        <Link
          to={`/learningpaths/${path.id}/first-step`}
          className="search-result_img_container">
          {image()}
        </Link>
        <div className="border-box_wrapper">
          <div className="border-box border-box--block">
            <LabeledIcon.Today
              labelText={formatDate(path.lastUpdated, lang)}
              tagName="time"
            />
          </div>
          <div className="border-box border-box--block">
            <LabeledIcon.QueryBuilder
              labelText={formatDuration(path.duration, lang)}
              tagName="time"
            />
          </div>
        </div>
        <div className="search-result_bd">
          <Link to={`/learningpaths/${path.id}/first-step`}>
            <h2 className="search-result_title">{path.title}</h2>
          </Link>
          <div className="search-result_meta">
            <LearningPathContributors copyright={path.copyright} />
          </div>
          <Link
            to={`/learningpaths/${path.id}/first-step`}
            className="search-result_description">
            {path.description}
          </Link>
          <LearningPathIntroduction path={path} />
          {path.isBasedOn ? <IsBasedOn path={path} /> : ''}
          <div>
            {tags.map(tag => (
              <button
                key={tag}
                className={tagsClassName(tag)}
                onClick={evt => onTagClick(evt, tag)}
                href="#">{`#${tag}`}</button>
            ))}
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
};

SearchResult.contextTypes = {
  lang: PropTypes.string.isRequired,
};
