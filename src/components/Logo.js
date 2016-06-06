import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import polyglot from '../i18n';
import withCloseSidebars from '../common/withCloseSidebars';

function Logo(props) {
  const {cssModifier, closeSidebars} = props;
  let rootClasses = classNames({
    logo: true,
    [`logo--${cssModifier}`]: cssModifier
  });

  return (
    <h1 className={rootClasses} onClick={closeSidebars}>
      <Link to="/" className="logo_link">{polyglot.t('logo.altText')}</Link>
    </h1>
  );
}

Logo.propTypes = {
  cssModifier: PropTypes.string,
  closeSidebars: PropTypes.func.isRequired
};


export default withCloseSidebars(Logo);
