import React, { PropTypes } from 'react';
import withCloseSidebars from '../common/withCloseSidebars';


export function Main(props) {
  const { children, closeSidebars, className } = props;
  return (
    <main onClick={closeSidebars} className={className}>
      {children}
    </main>
  );
}

Main.propTypes = {
  learningPath: PropTypes.object.isRequired,
  children: PropTypes.node,
  closeSidebars: PropTypes.func.isRequired,
};


export default withCloseSidebars(Main);
