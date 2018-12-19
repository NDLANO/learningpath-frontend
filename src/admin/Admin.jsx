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
import { HelmetWithTracker } from '@ndla/tracker';
import { updateLearningPathsStatus } from '../learningPath/learningPathActions';
import polyglot from '../i18n';
import Masthead from '../common/Masthead';
import { Wrapper, OneColumn, Footer } from '../common/Layout';
import { fetchPathsWithStatus } from '../sources/learningpaths';
import { fetchOwners } from '../sources/fetchOwners';
import { convertLearningPath } from '../learningPath/learningPathUtil';
import SelectSortTiles from '../learningPath/tile/SelectSortTiles';
import AdminRejectedMessageForm from './AdminRejectedMessageForm';
import AdminLearningPaths from './AdminLearningPaths';
import { sortPaths } from '../util/sortUtil';
import { getLocale } from '../locale/localeSelectors';

const getLearningPathsWithOwner = (learningPaths, users) =>
  learningPaths.map(learningPath => ({
    ...convertLearningPath(learningPath),
    owner: users.find(
      user => user.app_metadata.ndla_id === learningPath.ownerId,
    ),
  }));

export class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: {
        SUBMITTED: 'title',
        UNLISTED: 'title',
      },
      learningPaths: {
        SUBMITTED: [],
        UNLISTED: [],
      },
      showMessageLightbox: false,
      learningPathChanged: undefined,
      recjectMessage: '',
    };
    this.onDropDownSelect = this.onDropDownSelect.bind(this);
    this.setSortKey = this.setSortKey.bind(this);
    this.onRejectLearningPath = this.onRejectLearningPath.bind(this);
    this.onRejectSubmit = this.onRejectSubmit.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onLightboxClose = this.onLightboxClose.bind(this);
    this.updateStatusAndFetchLearningPaths = this.updateStatusAndFetchLearningPaths.bind(
      this,
    );
    this.fetchAllLearningPaths = this.fetchAllLearningPaths.bind(this);
  }

  async componentDidMount() {
    this.fetchAllLearningPaths();
  }

  onDropDownSelect(actionType, learningPath) {
    switch (actionType) {
      case 'unlist':
        this.onRejectLearningPath(learningPath, 'UNLISTED');
        break;
      case 'publish':
        this.updateStatusAndFetchLearningPaths(learningPath.id, 'PUBLISHED');
        break;
      case 'submit':
        this.updateStatusAndFetchLearningPaths(learningPath.id, 'SUBMITTED');
        break;
      case 'unpublish':
        if (learningPath.status === 'SUBMITTED') {
          this.onRejectLearningPath(learningPath, 'PRIVATE');
        } else {
          this.updateStatusAndFetchLearningPaths(learningPath.id, 'PRIVATE');
        }
        break;
      default:
    }
  }

  onRejectLearningPath(learningPath, newStatus) {
    if (learningPath.status === 'SUBMITTED') {
      this.setState({
        showMessageLightbox: true,
        learningPathChanged: { id: learningPath.id, status: newStatus },
      });
    } else {
      this.updateStatusAndFetchLearningPaths(learningPath.id, newStatus);
    }
  }

  async onRejectSubmit(evt) {
    evt.preventDefault();
    const { learningPathChanged, recjectMessage } = this.state;
    this.onLightboxClose();
    this.updateStatusAndFetchLearningPaths(
      learningPathChanged.id,
      learningPathChanged.status,
      recjectMessage,
      'SUBMITTED',
    );
  }

  onMessageChange(evt) {
    this.setState({ recjectMessage: evt.target.value });
  }

  onLightboxClose() {
    this.setState({
      showMessageLightbox: false,
      learningPathChanged: undefined,
      recjectMessage: '',
    });
  }

  setSortKey(statusType, value) {
    this.setState(prevState => ({
      sortKey: { ...prevState.sortKey, [statusType]: value },
      learningPaths: {
        ...prevState.learningPaths,
        [statusType]: sortPaths(prevState.learningPaths[statusType], value),
      },
    }));
  }

  async fetchAllLearningPaths() {
    const submittedLearningPaths = await fetchPathsWithStatus({
      learningPathStatus: 'SUBMITTED',
    });
    const unlistedLearningPaths = await fetchPathsWithStatus({
      learningPathStatus: 'UNLISTED',
    });

    const ownerIds = [...submittedLearningPaths, ...unlistedLearningPaths].map(
      learningPath => learningPath.ownerId,
    );
    const users = await fetchOwners(ownerIds);
    this.setState(prevState => ({
      learningPaths: {
        SUBMITTED: sortPaths(
          getLearningPathsWithOwner(submittedLearningPaths, users),
          prevState.sortKey.SUBMITTED,
        ),
        UNLISTED: sortPaths(
          getLearningPathsWithOwner(unlistedLearningPaths, users),
          prevState.sortKey.UNLISTED,
        ),
      },
    }));
  }

  async updateStatusAndFetchLearningPaths(id, status, recjectMessage) {
    const { updatePathStatus } = this.props;
    await updatePathStatus(id, status, false, recjectMessage);
    this.fetchAllLearningPaths();
  }

  render() {
    const { locale } = this.props;
    const {
      learningPaths,
      sortKey,
      recjectMessage,
      showMessageLightbox,
    } = this.state;

    return (
      <Wrapper>
        <OneColumn>
          <HelmetWithTracker title={polyglot.t('htmlTitles.adminPage')} />
          <Masthead />
          <div className="page-header page-header--admin">
            <h2 className="page-header_name">
              {polyglot.t('adminPage.pageHeader')}
            </h2>
          </div>

          <div className="tiles-header">
            <h2>{polyglot.t('adminPage.statusHeader.submitted')}</h2>
            <SelectSortTiles
              sortKey={sortKey.SUBMITTED}
              onChange={evt => this.setSortKey('SUBMITTED', evt.target.value)}
            />
          </div>
          <div className="tiles">
            <AdminLearningPaths
              learningPaths={learningPaths.SUBMITTED}
              onDropDownSelect={this.onDropDownSelect}
              noPathsText={polyglot.t('adminPage.noPaths.submitted')}
            />
          </div>

          <div className="tiles-header">
            <h2>{polyglot.t('adminPage.statusHeader.unlisted')}</h2>
            <SelectSortTiles
              sortKey={sortKey.UNLISTED}
              onChange={evt => this.setSortKey('UNLISTED', evt.target.value)}
            />
          </div>
          <div className="tiles">
            <AdminLearningPaths
              learningPaths={learningPaths.UNLISTED}
              onDropDownSelect={this.onDropDownSelect}
              noPathsText={polyglot.t('adminPage.noPaths.unlisted')}
            />
          </div>
        </OneColumn>
        <Footer locale={locale} />
        <AdminRejectedMessageForm
          message={recjectMessage}
          onSubmit={this.onRejectSubmit}
          onClose={this.onLightboxClose}
          show={showMessageLightbox}
          onChange={this.onMessageChange}
        />
      </Wrapper>
    );
  }
}

Admin.propTypes = {
  updatePathStatus: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

Admin.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  updatePathStatus: updateLearningPathsStatus,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
