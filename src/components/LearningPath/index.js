import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import defined from 'defined';
import classNames from 'classnames';
import LearningPathGeneralInfo from './LearningPathGeneralInfo';
import LearningPathPrevNext from './LearningPathPrevNext';
import LearningPathToC from './LearningPathToC';
import Masthead from '../Masthead';
import Icon from '../Icon';
import SortLearningStepsButton from './SortLearningStepsButton';
import {
  closeSidebars,
} from '../../actions';


export function LearningPath(props) {
  const { learningPath, localCloseSidebars, isTableOfContentOpen, activePathname, params: { stepId } } = props;
  const saveButtons = defined(props.saveButtons, null);
  const children = defined(props.main, props.children);
  const sortableTableOfContent = defined(props.sortLearningSteps, <LearningPathToC {...props} />);
  const sortableTableOfContentButton = !props.sortLearningSteps ? <SortLearningStepsButton learningPath={learningPath} /> : null;
  const collapseClassName = () => classNames({
    'two-column_col table-of-content': true,
    'sidebar--collapsed': !isTableOfContentOpen,
    'sidebar--open': isTableOfContentOpen,
  });
  return (
    <div>
      <Masthead saveButtons={saveButtons} activePathname={activePathname} sortLearningSteps={props.sortLearningSteps} sortableTableOfContentButton={sortableTableOfContentButton}>
        <div className="masthead-button--left">
          <Icon.MoreVert />
          <span>Læringssti</span>
        </div>
      </Masthead>
      <div className="two-column">
        <aside className={collapseClassName()}>
          <LearningPathGeneralInfo {...props} />
          {sortableTableOfContent}
          {sortableTableOfContentButton}
          {saveButtons}
        </aside>
        {children}
      </div>
      <div onClick={localCloseSidebars}>
        <LearningPathPrevNext currentStepId={stepId} />
      </div>
      <div className="learning-path_margin" />
    </div>
  );
}

LearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  saveButtons: PropTypes.object,
  main: PropTypes.object,
  params: PropTypes.shape({
    stepId: PropTypes.string
  }).isRequired,
  sortLearningSteps: PropTypes.object,
  activePathname: PropTypes.string,
  isTableOfContentOpen: PropTypes.bool.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: ownProps.location.pathname,
  isPreview: ownProps.route.isPreview,
  sortLearningSteps: ownProps.sortLearningSteps,
  isTableOfContentOpen: state.sidebar.isLeftSideBarOpen,
});

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPath);
