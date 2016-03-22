import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

export default function Logo ({cssModifier}) {
  let rootClasses = classNames({
    'logo': true,
    [`logo--${cssModifier}`]: cssModifier
  });

  return (
    <h1 className={rootClasses}>
      <Link to='/' className='logo_link'>Nasjonal digital læringsarena</Link>
    </h1>
  );
}

Logo.propTypes = { cssModifier: PropTypes.string };
