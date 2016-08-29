/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import defined from 'defined';
import classNames from 'classnames';
import LearningPathGeneralInfo from './sidebar/LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';
import LearningPathToC from './sidebar/LearningPathToC';
import Lightbox from '../common/Lightbox';
import CopyLearningPath from '../learningPath/new/CopyLearningPath';

import Masthead from '../common/Masthead';
import Icon from '../common/Icon';
import SortLearningStepsButton from './sidebar/SortLearningStepsButton';
import { fetchLearningPath, copyLearningPath } from './learningPathActions';

export class LearningPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCopyPath: false,
    };
    this.onCopyLearningPathClick = this.onCopyLearningPathClick.bind(this);
  }
  componentDidMount() {
    const { localFetchLearingPath, params: { pathId } } = this.props;
    localFetchLearingPath(pathId);
  }
  onCopyLearningPathClick() {
    this.setState({
      displayCopyPath: true,
    });
  }
  render() {
    const { learningPath, isTableOfContentOpen, copyPath, params: { stepId }, location: { pathname }, sortLearningSteps, main } = this.props;
    const { lang } = this.context;
    const saveButtons = defined(this.props.saveButtons, null);
    const addStepButton = defined(this.props.addStepButton, null);
    const children = cloneElement(defined(main, this.props.children), { lang, learningPath });
    const sortableTableOfContent = defined(sortLearningSteps, <LearningPathToC learningPath={learningPath} activeStepId={stepId} />);
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

    const mainClassNames = classNames('two-column_col', {
      'two-column_col--white-bg': !!stepId || pathname.indexOf('/new') !== -1,
    });

    return (
      <div className="wrapper">
        <Masthead saveButtons={saveButtons} sortLearningSteps={sortLearningSteps} sortableTableOfContentButton={sortableTableOfContentButton}>
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
            <LearningPathGeneralInfo {...this.props} onCopyLearningPathClick={this.onCopyLearningPathClick} />
            {sortableTableOfContent}
            {addStepButton}
            {sortableTableOfContentButton}
            {saveButtons}
          </aside>
          <main className={mainClassNames}>
            {children}
            <LearningPathPrevNext currentStepId={stepId} />
          </main>
        </div>
      </div>
    );
  }
}

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  saveButtons: PropTypes.object,
  addStepButton: PropTypes.object,
  main: PropTypes.object,
  params: PropTypes.shape({
    pathId: PropTypes.string.isRequired,
    stepId: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  sortLearningSteps: PropTypes.object,
  isTableOfContentOpen: PropTypes.bool.isRequired,
  localFetchLearingPath: PropTypes.func.isRequired,
  copyPath: PropTypes.func.isRequired,
};

LearningPath.contextTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  isPreview: ownProps.route.isPreview,
  sortLearningSteps: ownProps.sortLearningSteps,
  isTableOfContentOpen: state.sidebar.isLeftSideBarOpen,
});

const mapDispatchToProps = {
  copyPath: copyLearningPath,
  localFetchLearingPath: fetchLearningPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPath);
