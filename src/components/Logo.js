import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import polyglot from '../i18n';
import { closeSidebars } from '../actions';

function Logo(props) {
  const {cssModifier, localCloseSidebars} = props;
  let rootClasses = classNames({
    logo: true,
    [`logo--${cssModifier}`]: cssModifier
  });

  return (
    <h1 className={rootClasses} onClick={localCloseSidebars}>
      <Link to="/" className="logo_link">{polyglot.t('logo.altText')}</Link>
    </h1>
  );
}


Logo.propTypes = { cssModifier: PropTypes.string, localCloseSidebars: PropTypes.func.isRequired };

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(state => state, mapDispatchToProps)(Logo);
