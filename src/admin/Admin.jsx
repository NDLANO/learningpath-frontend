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
import { HelmetWithTracker } from 'ndla-tracker';
import { updateLearningPathsStatus } from '../learningPath/learningPathActions';
import polyglot from '../i18n';
import Masthead from '../common/Masthead';
import { Wrapper, OneColumn, Footer } from '../common/Layout';
import { fetchSubmittedPaths } from '../sources/learningpaths';
import AdminDropdown from './AdminDropdown';
import { convertLearningPath } from '../learningPath/learningPathUtil';
import LearningPathTile from '../learningPath/tile/LearningPathTile';
import SelectSortTiles from '../learningPath/tile/SelectSortTiles';
import AdminRejectedMessageForm from './AdminRejectedMessageForm';

export class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'title',
      learningPaths: [],
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
  }

  async componentDidMount() {
    const learningPaths = await fetchSubmittedPaths();
    this.setState({ learningPaths: learningPaths.map(convertLearningPath) });
  }

  onDropDownSelect(actionType, learningPath) {
    const { updatePathStatus } = this.props;
    console.log("LEL", actionType)
    switch (actionType) {
      case 'unlist':
        this.onRejectLearningPath(learningPath, 'UNLISTED');
        break;
      case 'publish':
        updatePathStatus(learningPath.id, 'PUBLISHED');
        break;
      case 'private':
        this.onRejectLearningPath(learningPath, 'PRIVATE');
        break;
      default:
    }
  }

  onRejectLearningPath(learningPath, newStatus) {
    const { updatePathStatus } = this.props;
    console.log("lel")
    // if(learningPath.status === 'SUBMITTED') {
      this.setState({showMessageLightbox: true, learningPathChanged: {id: learningPath.id, status: newStatus}})
    /* } else {
      updatePathStatus(learningPath.id, newStatus);
    } */
  }

  onRejectSubmit() {
    const { updatePathStatus } = this.props;
    const {learningPathChanged, status} = this.state;
    updatePathStatus(learningPathChanged.id, status);
  }

  onMessageChange(evt) {
    this.setState({recjectMessage: evt.target.value});
  }

  onLightboxClose() {
    this.setState({showMessageLightbox: false, learningPathChanged: undefined})
  }

  setSortKey(evt) {
    this.setState({ sortKey: evt.target.value });
  }

  render() {
    const { learningPaths, sortKey, recjectMessage, showMessageLightbox } = this.state;
    const items = learningPaths.map(learningPath => {
      const dropdown = (
        <AdminDropdown
          onSelect={this.onDropDownSelect}
          learningPath={learningPath}
        />
      );
      return (
        <LearningPathTile
          key={learningPath.id}
          dropdown={dropdown}
          learningPath={learningPath}
        />
      );
    });
    return (
      <Wrapper>
        <OneColumn>
          <HelmetWithTracker title={polyglot.t('htmlTitles.adminPage')} />
          <Masthead />
          <div className="page-header page-header--admin">
            <h2 className="page-header_name">
              {polyglot.t('adminPage.pageHeader')}
            </h2>
            <div className="page-header_ctrls">
              <SelectSortTiles sortKey={sortKey} onChange={this.setSortKey} />
            </div>
          </div>
          <div className="tiles">{items}</div>
        </OneColumn>
        <Footer />
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
};

Admin.contextTypes = {
  lang: PropTypes.string.isRequired,
};


const mapDispatchToProps = {
  updatePathStatus: updateLearningPathsStatus,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Admin);
