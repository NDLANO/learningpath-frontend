import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import polyglot from '../i18n';

export default function Logo ({cssModifier}) {
  let rootClasses = classNames({
    'logo': true,
    [`logo--${cssModifier}`]: cssModifier
  });

  return (
    <h1 className={rootClasses}>
      <Link to='/' className='logo_link'>{polyglot.t('logo.altText')}</Link>
    </h1>
  );
}

Logo.propTypes = { cssModifier: PropTypes.string };
