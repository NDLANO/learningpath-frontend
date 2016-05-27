import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Logo from './Logo';
import SiteNav from './SiteNav';
import Icon from './Icon';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import LearningPathToC from './LearningPath/LearningPathToC';
import LearningPathGeneralInfo from './LearningPath/LearningPathGeneralInfo';
import defined from 'defined';
import get from 'lodash/get';
export class Masthead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isRightOpen: false, isLeftOpen: false};
    this.documentClickHandler = this.documentClickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler);
  }

  documentClickHandler(evt) {
    const mastheadArea = ReactDOM.findDOMNode(this.refs.masthead);
    const tocArea = ReactDOM.findDOMNode(this.refs.toc);


    if (this.state.isRightOpen && !mastheadArea.contains(evt.target)) {
      this.setState({isRightOpen: false});
    } else if (this.state.isLeftOpen && (tocArea.contains(evt.target) || !mastheadArea.contains(evt.target))) {
      this.setState({isLeftOpen: false});
    }
  }

  leftNavButtonClicked() {
    this.setState({isRightOpen: !this.state.isRightOpen});

    if (this.state.isLeftOpen) {
      this.setState({isLeftOpen: false});
    }
  }

  rightNavButtonClicked() {
    this.setState({isLeftOpen: !this.state.isLeftOpen});
    if (this.state.isRightOpen) {
      this.setState({isRightOpen: false});
    }
  }

  render() {

    const children = this.props.children ? React.cloneElement(this.props.children, {onClick: () => this.rightNavButtonClicked()}) : null;

    const collapseClassName = (isLeft, isOpen) => classNames({
      'masthead-big-screen': !isLeft,
      'masthead-toc': isLeft,
      collapsed: !isOpen,
      in: isOpen,
    });
    const tableOfContent = () => {
      if (children) {
        const saveButtons = defined(this.props.saveButtons, null);
        return (
          <div>
            <LearningPathGeneralInfo {...this.props} />
            <LearningPathToC {...this.props} />
            {saveButtons}
          </div>
        );
      }
      return null;
    };
    return (
      <div>
        <div className="masthead" ref="masthead">
          <div className="masthead-small-screen">
            {children}
            <Logo />
            <div className="masthead-button--right" onClick={() => this.leftNavButtonClicked()}>
              <Icon.Menu />
              <span>Meny</span>
            </div>
          </div>
          <div className={collapseClassName(true, this.state.isLeftOpen)} ref="toc" >
            {tableOfContent()}
          </div>
          <div className={collapseClassName(false, this.state.isRightOpen)} ref="siteNav">
            <div className="masthead_left">
              <Logo />
            </div>
            <div className="masthead_right">
              <SiteNav />
            </div>
          </div>
        </div>
        <div className="masthead_bottom--margin" />
      </div>
    );
  }
}

Masthead.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.learningPath,
  activePathname: get(ownProps, 'activePathname', ''),
  saveButtons: get(ownProps, 'saveButtons', ''),
});

export default connect(mapStateToProps)(Masthead);
