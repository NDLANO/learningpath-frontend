import React, { PropTypes } from 'react';
import withCloseSidebars from '../common/withCloseSidebars';

const Content = ({ children, closeSidebars, className }) =>
  <div onClick={closeSidebars} className={className}>
    {children}
  </div>;

Content.propTypes = {
  learningPath: PropTypes.object.isRequired,
  children: PropTypes.node,
  closeSidebars: PropTypes.func.isRequired,
};

export default withCloseSidebars(Content);
