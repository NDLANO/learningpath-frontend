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
import { HelmetWithTracker } from 'ndla-tracker';
import {
  deleteLearningPath,
  updateLearningPathsStatus,
} from '../learningPath/learningPathActions';
import Icon from '../common/Icon';
import polyglot from '../i18n';
import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';
import Masthead from '../common/Masthead';
import { Wrapper, OneColumn, Footer } from '../common/Layout';
import { fetchRequestedForPublishPaths } from '../sources/learningpaths';
import AdminDropdown from './AdminDropdown';
import { convertLearningPath } from '../learningPath/learningPathUtil';

export class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'title',
      learningPaths: [],
    };
    this.onDropDownSelect = this.onDropDownSelect.bind(this);
    this.setSortKey = this.setSortKey.bind(this);
  }

  async componentDidMount() {
    const learningPaths = await fetchRequestedForPublishPaths();
    this.setState({ learningPaths: learningPaths.map(convertLearningPath) });
  }

  onDropDownSelect(actionType, learningPath) {
    const { deletePath, updatePathStatus } = this.props;
    switch (actionType) {
      case 'delete':
        deletePath(learningPath);
        break;
      case 'unlist':
        updatePathStatus(learningPath.id, 'UNLISTED');
        break;
      case 'publish':
        updatePathStatus(learningPath.id, 'PUBLISHED');
        break;
      case 'private':
        updatePathStatus(learningPath.id, 'PRIVATE');
        break;
      default:
    }
  }

  setSortKey(evt) {
    this.setState({ sortKey: evt.target.value });
  }

  render() {
    const { learningPaths, sortKey } = this.state;
    const { lang } = this.context;
    const items = learningPaths.map(learningPath => {
      const duration = formatDuration(learningPath.duration, lang);
      const lastUpdated = formatDate(learningPath.lastUpdated, lang);
      return (
        <div key={learningPath.id} className="tile">
          <HelmetWithTracker title={polyglot.t('htmlTitles.myPage')} />
          <div className="tile_hd">
            <div className="tile_date">{lastUpdated}</div>
            <div className="tile_context-menu">
              <AdminDropdown
                onSelect={this.onDropDownSelect}
                learningPath={learningPath}
              />
            </div>
          </div>
          <Link
            className="tile_bd"
            to={`/learningpaths/${learningPath.id}/first-step`}>
            <h3 className="tile_title">{learningPath.title}</h3>
            <p>{learningPath.description}</p>
          </Link>
          <div className="tile_ft">
            <div className="tile_property">
              <div className="tile_property-icon">
                <Icon.Duration />
              </div>
              <p className="tile_property-description">
                {polyglot.t('myPage.path.duration')}
              </p>
              <p>{duration}</p>
            </div>
            <div className="tile_property">
              <div className="tile_property-icon">
                <Icon.Visibility />
              </div>
              <p className="tile_property-description">
                {polyglot.t('myPage.path.status')}
              </p>
              <p>
                {polyglot.t(`myPage.path.statusValue.${learningPath.status}`)}
              </p>
            </div>
          </div>
        </div>
      );
    });

    const sortOrderSelect = (
      <select
        className="select--white-border"
        value={sortKey}
        onChange={this.setSortKey}>
        <option value="title">{polyglot.t('myPage.order.title')}</option>
        <option value="-lastUpdated">
          {polyglot.t('myPage.order.newest')}
        </option>
        <option value="lastUpdated">{polyglot.t('myPage.order.oldest')}</option>
        <option value="status">{polyglot.t('myPage.order.status')}</option>
      </select>
    );

    return (
      <Wrapper>
        <OneColumn>
          <Masthead />
          <div className="page-header page-header--primary">
            <h2 className="page-header_name">
              {polyglot.t('myPage.pageHeader')}
            </h2>
            <div className="page-header_ctrls">{sortOrderSelect}</div>
          </div>
          <div className="tiles">{items}</div>
        </OneColumn>
        <Footer />
      </Wrapper>
    );
  }
}

Admin.propTypes = {
  deletePath: PropTypes.func.isRequired,
  updatePathStatus: PropTypes.func.isRequired,
  localFetchMyLearningPaths: PropTypes.func.isRequired,
};

Admin.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  deletePath: deleteLearningPath,
  updatePathStatus: updateLearningPathsStatus,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Admin);
