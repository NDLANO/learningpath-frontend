/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
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
import withTracker from '../common/withTracker';
import SortLearningStepsButton from './sidebar/SortLearningStepsButton';
import LearningPathSummary from './sidebar/LearningPathSummary';
import { fetchLearningPath, copyLearningPath } from './learningPathActions';
import { getLearningPath } from './learningPathSelectors';
import LearningPathStep from './step/LearningPathStep';
import CreateLearningPathStep from './step/create/CreateLearningPathStep';
import EditLearningPathStep from './step/edit/EditLearningPathStep';
import EditLearningPath from './edit/EditLearningPath';
import SortLearningPathSteps from './step/sort/SortLearningPathSteps';
import SortLearningStepsSaveButton from './step/sort/SortLearningPathStepsSaveButton';
import LearningPathToCButtons from './sidebar/LearningPathToCButtons';
import AddLearningPathStepButton from './sidebar/AddLearningPathStepButton';
import PinterestLightboxButton from '../pinterest/PinterestLightboxButton';
import PinterestLightbox from '../pinterest/PinterestLightbox';
import polyglot from '../i18n';

export class LearningPath extends Component {
  static mapDispatchToProps = {
    copyPath: copyLearningPath,
    localFetchLearningPath: fetchLearningPath,
    replaceRoute: routerActions.replace,
  };

  static fetchData(props) {
    const {
      replaceRoute,
      localFetchLearningPath,
      match: { url, params: { pathId } },
    } = props;
    if (url === `/learningpaths/${pathId}/edit`) {
      return localFetchLearningPath(pathId, true);
    } else if (url === `/learningpaths/${pathId}/first-step`) {
      return localFetchLearningPath(pathId, false)
        .then(learningPath => {
          const stepId = learningPath.learningsteps[0].id;
          replaceRoute({ pathname: `/learningpaths/${pathId}/step/${stepId}` });
        })
        .catch(() => {
          replaceRoute({ pathname: `/learningpaths/${pathId}` });
        });
    }
    return localFetchLearningPath(pathId, false);
  }

  static getDocumentTitle(props) {
    const { learningPath } = props;
    return learningPath.title + polyglot.t('htmlTitles.titleTemplate');
  }

  static willTrackPageView(trackPageView, currentProps) {
    const { learningPath, match: { url, params: { pathId } } } = currentProps;
    if (
      learningPath.id &&
      learningPath.id.toString() === pathId &&
      !url.includes('first-step') // Skip first-step which is just a redirect
    ) {
      trackPageView(currentProps);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      displayCopyPath: false,
      displayPinterest: false,
    };
    this.onCopyLearningPathClick = this.onCopyLearningPathClick.bind(this);
    this.togglePinterest = this.togglePinterest.bind(this);
  }

  componentDidMount() {
    LearningPath.fetchData(this.props);
  }

  onCopyLearningPathClick() {
    this.setState({
      displayCopyPath: true,
    });
  }
  togglePinterest() {
    this.setState(prevState => ({
      displayPinterest: !prevState.displayPinterest,
    }));
  }

  render() {
    const { learningPath, isTableOfContentOpen, copyPath, match } = this.props;
    const { lang } = this.context;
    const stepId = match.params.stepId;

    const showButtonsUrls = [
      '/learningpaths/:pathId',
      '/learningpaths/:pathId/step/:stepId',
      '/learningpaths/:pathId/',
      '/learningpaths/:pathId/step/:stepId/',
    ];

    const changeStatusButton =
      showButtonsUrls.includes(match.path) && match.isExact ? (
        <LearningPathToCButtons />
      ) : null;
    const addStepButton =
      showButtonsUrls.includes(match.path) && match.isExact ? (
        <AddLearningPathStepButton />
      ) : null;
    const pinterestButton =
      showButtonsUrls.includes(match.path) && match.isExact ? (
        <PinterestLightboxButton
          learningPath={learningPath}
          toggleLightBox={this.togglePinterest}
        />
      ) : null;
    const pinterestLightBox =
      showButtonsUrls.includes(match.path) && match.isExact ? (
        <PinterestLightbox
          learningPath={learningPath}
          showLightBox={this.state.displayPinterest}
          toggleLightBox={this.togglePinterest}
        />
      ) : null;
    const sortLearningSteps =
      match.url === `/learningpaths/${match.params.pathId}/step/sort`;
    const sortableTableOfContent = sortLearningSteps ? (
      <SortLearningPathSteps learningPath={learningPath} />
    ) : (
      <LearningPathToC learningPath={learningPath} activeStepId={stepId} />
    );
    const sortableTableOfContentButton = !sortLearningSteps ? (
      <SortLearningStepsButton learningPath={learningPath} />
    ) : null;
    const sortableTableOfContentSaveButton = sortLearningSteps ? (
      <SortLearningStepsSaveButton learningPath={learningPath} />
    ) : null;

    const collapseClassName = () =>
      classNames({
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
        <Helmet title={this.constructor.getDocumentTitle(this.props)} />
        <Masthead
          changeStatusButton={changeStatusButton}
          sortableTableOfContentButton={sortableTableOfContentButton}>
          <div className="masthead_button masthead_button--left">
            <Icon.MoreVert />
            <span>Læringssti</span>
          </div>
        </Masthead>
        <Lightbox
          display={this.state.displayCopyPath}
          onClose={onLightboxClose}>
          <CopyLearningPath
            learningPath={learningPath}
            onClose={onLightboxClose}
            onCopy={onCopy}
          />
        </Lightbox>
        {pinterestLightBox}
        <div className="two-column">
          <aside className={collapseClassName()}>
            <LearningPathGeneralInfo
              {...this.props}
              onCopyLearningPathClick={this.onCopyLearningPathClick}
              changeStatusButton={changeStatusButton}
            />
            <div>
              {addStepButton}
              {pinterestButton}
              {sortableTableOfContentSaveButton}
              {sortableTableOfContentButton}
            </div>
            <div className="step-nav_wrapper">{sortableTableOfContent}</div>
          </aside>
          <main className="two-column_col">
            <Switch>
              <PrivateRoute
                path={'/learningpaths/:pathId/edit'}
                component={EditLearningPath}
              />
              <PrivateRoute
                path={'/learningpaths/:pathId/step/:stepId/edit'}
                component={EditLearningPathStep}
              />
              <PrivateRoute
                path={'/learningpaths/:pathId/step/new'}
                component={CreateLearningPathStep}
              />
              <PrivateRoute
                path={'/learningpaths/:pathId/step/sort'}
                component={LearningPathSummary}
              />
              <Route
                path={'/learningpaths/:pathId/step/:stepId'}
                component={LearningPathStep}
              />
              <Route
                path={'/learningpaths/:pathId'}
                component={LearningPathSummary}
              />
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
  localFetchLearningPath: PropTypes.func.isRequired,
  copyPath: PropTypes.func.isRequired,
  replaceRoute: PropTypes.func.isRequired,
};

LearningPath.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, state, {
    learningPath: getLearningPath(state),
    sortLearningSteps: ownProps.sortLearningSteps,
    isTableOfContentOpen: state.sidebar.isLeftSideBarOpen,
  });

export default withRouter(
  connect(mapStateToProps, LearningPath.mapDispatchToProps)(
    withTracker(LearningPath),
  ),
);
