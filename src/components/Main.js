import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  closeSidebars,
} from '../actions';


export function Main(props) {
  const { children, localCloseSidebars, className } = props;
  return (
    <main onClick={localCloseSidebars} className={className}>
      {children}
    </main>
  );
}

Main.propTypes = {
  learningPath: PropTypes.object.isRequired,
  children: PropTypes.node,
  localCloseSidebars: PropTypes.func.isRequired,
};


const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(state => state, mapDispatchToProps)(Main);
