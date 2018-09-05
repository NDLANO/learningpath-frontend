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
    const learningPaths = await fetchSubmittedPaths();
    this.setState({ learningPaths: learningPaths.map(convertLearningPath) });
  }

  onDropDownSelect(actionType, learningPath) {
    const { updatePathStatus } = this.props;
    switch (actionType) {
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
          <div className="page-header page-header--primary">
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
