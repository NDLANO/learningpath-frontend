import React, { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import defined from 'defined';
import classNames from 'classnames';
import LearningPathGeneralInfo from './sidebar/LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';
import LearningPathToC from './sidebar/LearningPathToC';

import Masthead from '../components/Masthead';
import Icon from '../components/Icon';
import SortLearningStepsButton from './sidebar/SortLearningStepsButton';
import { fetchLearningPath, copyLearningPath } from '../actions';

export class LearningPath extends Component {

  componentDidMount() {
    const { localFetchLearingPath, params: { pathId } } = this.props;
    localFetchLearingPath(pathId);
  }

  render() {
    const { learningPath, isTableOfContentOpen, activePathname, params: { stepId }, sortLearningSteps, main} = this.props;
    const { lang } = this.context;
    const saveButtons = defined(this.props.saveButtons, null);
    const addStepButton = defined(this.props.addStepButton, null);
    const children = cloneElement(defined(main, this.props.children), { lang, learningPath });
    const sortableTableOfContent = defined(sortLearningSteps, <LearningPathToC {...this.props} />);
    const sortableTableOfContentButton = !sortLearningSteps ? <SortLearningStepsButton learningPath={learningPath} /> : null;

    const collapseClassName = () => classNames({
      'two-column_col table-of-content': true,
      'sidebar--collapsed': !isTableOfContentOpen,
      'sidebar--open': isTableOfContentOpen,
    });

    return (
      <div>
        <Masthead saveButtons={saveButtons} activePathname={activePathname} sortLearningSteps={sortLearningSteps} sortableTableOfContentButton={sortableTableOfContentButton}>
          <div className="masthead_button masthead_button--left">
            <Icon.MoreVert />
            <span>Læringssti</span>
          </div>
        </Masthead>
        <div className="two-column">
          <aside className={collapseClassName()}>
            <LearningPathGeneralInfo {...this.props} />
            {sortableTableOfContent}
            {addStepButton}
            {sortableTableOfContentButton}
            {saveButtons}
          </aside>
          {children}
        </div>
        <LearningPathPrevNext currentStepId={stepId} />
        <div className="learning-path_margin" />
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
    stepId: PropTypes.string
  }).isRequired,
  sortLearningSteps: PropTypes.object,
  activePathname: PropTypes.string,
  isTableOfContentOpen: PropTypes.bool.isRequired,
  localFetchLearingPath: PropTypes.func.isRequired,
};

LearningPath.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: ownProps.location.pathname,
  isPreview: ownProps.route.isPreview,
  sortLearningSteps: ownProps.sortLearningSteps,
  isTableOfContentOpen: state.sidebar.isLeftSideBarOpen,
});

const mapDispatchToProps = {
  copyPath: copyLearningPath,
  localFetchLearingPath: fetchLearningPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPath);
