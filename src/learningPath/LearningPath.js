/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import LearningPathGeneralInfo from './sidebar/LearningPathGeneralInfo';
import LearningPathToC from './sidebar/LearningPathToC';
import Lightbox from '../common/Lightbox';
import PrivateRoute from '../main/PrivateRoute';
import CopyLearningPath from '../learningPath/new/CopyLearningPath';
import Masthead from '../common/Masthead';
import Icon from '../common/Icon';
import SortLearningStepsButton from './sidebar/SortLearningStepsButton';
import LearningPathSummary from './sidebar/LearningPathSummary';
import { fetchLearningPath, copyLearningPath } from './learningPathActions';
import { getI18nLearningPath } from './learningPathSelectors';
import PintrestLightboxButton from './sidebar/PintrestLightboxButton';
import LearningPathStep from './step/LearningPathStep';
import CreateLearningPathStep from './step/create/CreateLearningPathStep';
import EditLearningPathStep from './step/edit/EditLearningPathStep';
import EditLearningPath from './edit/EditLearningPath';
import SortLearningPathSteps from './step/sort/SortLearningPathSteps';
import LearningPathToCButtons from './sidebar/LearningPathToCButtons';
import AddLearningPathStepButton from './sidebar/AddLearningPathStepButton';

export class LearningPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCopyPath: false,
    };
    this.onCopyLearningPathClick = this.onCopyLearningPathClick.bind(this);
  }
  componentDidMount() {
    const { pushRoute, localFetchLearingPath, match: { url, params: { pathId } } } = this.props;
    if (url === `/learningpaths/${pathId}/edit`) {
      localFetchLearingPath(pathId, true);
    } else if (url === `/learningpaths/${pathId}/first-step`) {
      localFetchLearingPath(pathId, false).then(() => {
        const stepId = this.props.learningPath.learningsteps[0].id;
        pushRoute({ pathname: `/learningpaths/${pathId}/step/${stepId}` });
      }).catch(() => {
        pushRoute({ pathname: `/learningpaths/${pathId}` });
      });
    } else {
      localFetchLearingPath(pathId, false);
    }
  }
  onCopyLearningPathClick() {
    this.setState({
      displayCopyPath: true,
    });
  }
  render() {
    const { learningPath, isTableOfContentOpen, copyPath, match } = this.props;
    const { lang } = this.context;
    const stepId = match.params.stepId;

    const showButtonsUrls = ['/learningpaths/:pathId', '/learningpaths/:pathId/step/:stepId', '/learningpaths/:pathId/', '/learningpaths/:pathId/step/:stepId/'];

    const changeStatusButton = showButtonsUrls.includes(match.path) && match.isExact ? <LearningPathToCButtons /> : null;
    const addStepButton = showButtonsUrls.includes(match.path) && match.isExact ? <AddLearningPathStepButton /> : null;

    const sortLearningSteps = match.url === `/learningpaths/${match.params.pathId}/step/sort`;
    const sortableTableOfContent = sortLearningSteps ? <SortLearningPathSteps learningPath={learningPath} /> : <LearningPathToC learningPath={learningPath} activeStepId={stepId} />;
    const sortableTableOfContentButton = !sortLearningSteps ? <SortLearningStepsButton learningPath={learningPath} /> : null;

    const collapseClassName = () => classNames({
      'two-column_col table-of-content': true,
      'sidebar--collapsed': !isTableOfContentOpen,
      'sidebar--open': isTableOfContentOpen,
    });

    const onLightboxClose = () => this.setState({ displayCopyPath: false });
    const onCopy = () => {
      copyPath(learningPath, lang);
      onLightboxClose();
    };
    return (
      <div className="wrapper">
        <Masthead changeStatusButton={changeStatusButton} sortableTableOfContentButton={sortableTableOfContentButton}>
          <div className="masthead_button masthead_button--left">
            <Icon.MoreVert />
            <span>Læringssti</span>
          </div>
        </Masthead>
        <Lightbox display={this.state.displayCopyPath} onClose={onLightboxClose}>
          <CopyLearningPath learningPath={learningPath} onClose={onLightboxClose} onCopy={onCopy} />
        </Lightbox>
        <div className="two-column">
          <aside className={collapseClassName()}>
            <LearningPathGeneralInfo
              {...this.props}
              onCopyLearningPathClick={this.onCopyLearningPathClick}
              addStepButton={addStepButton}
              changeStatusButton={changeStatusButton}
            />
            <div className="step-nav_wrapper">
              {sortableTableOfContentButton}
              {sortableTableOfContent}
              <PintrestLightboxButton learningPath={learningPath} />
            </div>
          </aside>
          <main className="two-column_col">
            <Switch>
              <PrivateRoute path={'/learningpaths/:pathId/edit'} component={EditLearningPath} />
              <PrivateRoute path={'/learningpaths/:pathId/step/:stepId/edit'} component={EditLearningPathStep} />
              <PrivateRoute path={'/learningpaths/:pathId/step/new'} component={CreateLearningPathStep} />
              <PrivateRoute path={'/learningpaths/:pathId/step/sort'} component={LearningPathSummary} />
              <Route path={'/learningpaths/:pathId/step/:stepId'} component={LearningPathStep} />
              <Route path={'/learningpaths/:pathId'} component={LearningPathSummary} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pathId: PropTypes.string.isRequired,
      stepId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  isTableOfContentOpen: PropTypes.bool.isRequired,
  localFetchLearingPath: PropTypes.func.isRequired,
  copyPath: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired,
};

LearningPath.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: getI18nLearningPath(state),
  sortLearningSteps: ownProps.sortLearningSteps,
  isTableOfContentOpen: state.sidebar.isLeftSideBarOpen,
});

const mapDispatchToProps = {
  copyPath: copyLearningPath,
  localFetchLearingPath: fetchLearningPath,
  pushRoute: routerActions.push,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LearningPath));
