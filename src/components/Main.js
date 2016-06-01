import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  closeSidebars,
} from '../actions';


export function Main(props) {
  const { children, closeBothSidebars, className } = props;
  return (
    <main onClick={closeBothSidebars} className={className}>
      {children}
    </main>
  );
}

Main.propTypes = {
  learningPath: PropTypes.object.isRequired,
  children: PropTypes.object,
  closeBothSidebars: PropTypes.func.isRequired,
};


const mapDispatchToProps = {
  closeBothSidebars: closeSidebars,
};

export default connect(state => state, mapDispatchToProps)(Main);
