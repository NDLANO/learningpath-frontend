/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import get from 'lodash/get';
import { deleteLearningPath, createLearningPath, copyLearningPath, updateLearningPathsStatus } from '../learningPath/learningPathActions';
import Icon from '../common/Icon';
import LabeledIcon from '../common/LabeledIcon';
import polyglot from '../i18n';
import { LearningPathDropdown } from './LearningPathDropdown';
import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import Lightbox from '../common/Lightbox';
import Masthead from '../common/Masthead';
import CreateLearningPath from '../learningPath/new/CreateLearningPath';
import { Wrapper, OneColumn, Footer } from '../common/Layout';
import { fetchLearningPathLicensesIfNeeded } from '../learningPath/edit/copyright/learningPathLicensesActions';
import { setMyLearningPathsSortOrder, fetchMyLearningPaths } from './myPageActions';

export class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCreatePath: false,
    };
    this.onCreateLearningPathClick = this.onCreateLearningPathClick.bind(this);
  }

  componentDidMount() {
    const { fetchLearninigPathLicenses, localFetchMyLearningPaths } = this.props;
    fetchLearninigPathLicenses('by');
    localFetchMyLearningPaths();
  }

  onCreateLearningPathClick() {
    this.setState({
      displayCreatePath: true,
    });
  }

  render() {
    const { learningPaths, sortKey, setSortKey, deletePath, updatePathStatus, createPath, copyPath, licenses } = this.props;
    const { lang } = this.context;
    const items = learningPaths.map((lp) => {
      const title = titleI18N(lp, lang, true);
      const description = descriptionI18N(lp, lang, true);
      const duration = formatDuration(lp.duration, lang);
      const lastUpdated = formatDate(lp.lastUpdated, lang);

      const onDropDownSelect = (actionType) => {
        switch (actionType) {
          case 'delete':
            deletePath(lp);
            break;
          case 'publish':
            updatePathStatus(lp.id, 'PUBLISHED');
            break;
          case 'unlist':
            updatePathStatus(lp.id, 'NOT_LISTED');
            break;
          case 'unpublish':
            updatePathStatus(lp.id, 'PRIVATE');
            break;
          case 'makecopy':
            copyPath(lp, lang);
            break;
          default:
        }
      };

      return (
        <div key={lp.id} className="tile">
          <div className="tile_hd">
            <div className="tile_date">{lastUpdated}</div>
            <div className="tile_context-menu">
              <LearningPathDropdown onSelect={onDropDownSelect} learningPath={lp} />
            </div>
          </div>
          <Link className="tile_bd" to={`/learningpaths/${lp.id}/first-step`}>
            <h3 className="tile_title">{title}</h3>
            <p>{description}</p>
          </Link>
          <div className="tile_ft">
            <div className="tile_property">
              <div className="tile_property-icon"><Icon.Duration /></div>
              <p className="tile_property-description">{polyglot.t('myPage.path.duration')}</p>
              <p>{duration}</p>
            </div>
            <div className="tile_property">
              <div className="tile_property-icon"><Icon.Visibility /></div>
              <p className="tile_property-description">{polyglot.t('myPage.path.status')}</p>
              <p>{polyglot.t(`myPage.path.statusValue.${lp.status}`)}</p>
            </div>
          </div>
        </div>
      );
    });

    const sortOrderSelect = (
      <select className="select--white-border" value={sortKey} onChange={evt => setSortKey(evt.target.value)}>
        <option value="title">{polyglot.t('myPage.order.title')}</option>
        <option value="-lastUpdated">{polyglot.t('myPage.order.newest')}</option>
        <option value="lastUpdated">{polyglot.t('myPage.order.oldest')}</option>
        <option value="status">{polyglot.t('myPage.order.status')}</option>
      </select>
    );

    const onCreateLearningPathSubmit = (values) => {
      createPath({
        title: [{ title: values.title, language: lang }],
        description: [{ description: values.description, language: lang }],
        duration: 1,
        coverPhoto: { url: '', metaUrl: '' },
        copyright: { license: values.license ? values.license : licenses[0], contributors: [] },
      });
    };

    const onLightboxClose = () => this.setState({ displayCreatePath: false });

    return (
      <Wrapper>
        <OneColumn>
          <Masthead />
          <div className="page-header page-header--primary">
            <h2 className="page-header_name">{polyglot.t('myPage.pageHeader')}</h2>
            <div className="page-header_ctrls">
              {sortOrderSelect}
            </div>
          </div>
          <div className="tiles">{items}</div>
          <button className="cta-link new-learningpath-button" onClick={this.onCreateLearningPathClick}>
            <LabeledIcon.Add labelText={polyglot.t('myPage.newBtn')} />
          </button>
          <Lightbox display={this.state.displayCreatePath} onClose={onLightboxClose}>
            <CreateLearningPath onSubmit={onCreateLearningPathSubmit} licenseOptions={licenses} />
          </Lightbox>
        </OneColumn>
        <Footer />
      </Wrapper>
    );
  }
}

MyPage.propTypes = {
  sortKey: PropTypes.oneOf(['title', 'lastUpdated', '-lastUpdated', 'status']),
  setSortKey: PropTypes.func.isRequired,
  deletePath: PropTypes.func.isRequired,
  updatePathStatus: PropTypes.func.isRequired,
  createPath: PropTypes.func.isRequired,
  learningPaths: PropTypes.array,
  copyPath: PropTypes.func.isRequired,
  fetchLearninigPathLicenses: PropTypes.func.isRequired,
  localFetchMyLearningPaths: PropTypes.func.isRequired,
  licenses: PropTypes.array.isRequired,
};

MyPage.defaultProps = { learningPaths: [], sortKey: 'title' };

MyPage.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const sortPaths = (paths, field, state) => {
  switch (field) {
    case 'title':
      return sortBy(paths, p => titleI18N(p, state.lang, true));

    case 'lastUpdated':
      return sortBy(paths, field);

    case '-lastUpdated':
      return reverse(sortBy(paths, 'lastUpdated'));

    default:
      return sortBy(paths, field);
  }
};

export function mapStateToProps(state) {
  const sortKey = state.myLearningPathsSortOrder || 'title';
  const learningPaths = sortPaths(state.learningPaths, sortKey, state);
  const licenses = get(state, 'learningPathLicenses.creativeCommonLicenses.all', []);

  return Object.assign({}, state, { learningPaths, sortKey, licenses });
}

const mapDispatchToProps = {
  setSortKey: setMyLearningPathsSortOrder,
  deletePath: deleteLearningPath,
  updatePathStatus: updateLearningPathsStatus,
  createPath: createLearningPath,
  copyPath: copyLearningPath,
  fetchLearninigPathLicenses: fetchLearningPathLicensesIfNeeded,
  localFetchMyLearningPaths: fetchMyLearningPaths,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
