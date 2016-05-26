import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Logo from './Logo';
import SiteNav from './SiteNav';
import Icon from './Icon';
import { Link } from 'react-router';
export class Masthead extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div className="masthead">
          <div className="masthead-small-screen">
            {children}
            <Logo />
            <div className="masthead-button--right" onClick>
              <Icon.Menu />
              <span>Meny</span>
            </div>
          </div>
          <div className="masthead-big-screen in">
            <div className="masthead_left">
              <Logo />
            </div>
            <div className="masthead_right">
              <SiteNav />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Masthead.propTypes = {
  children: PropTypes.node
};

export default connect(state => state)(Masthead);
