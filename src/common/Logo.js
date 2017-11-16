/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import polyglot from '../i18n';
import withCloseSidebars from '../common/withCloseSidebars';

function Logo(props) {
  const { cssModifier, closeSidebars, beta } = props;
  const rootClasses = classNames({
    logo: true,
    'un-button': true,
    [`logo--${cssModifier}`]: cssModifier,
    'logo--beta': beta,
    [`logo--${cssModifier}--beta`]: beta,
  });

  return (
    <div className={rootClasses}>
      <Link
        to="/"
        className={beta ? 'logo_link logo_link-beta' : 'logo_link'}
        onClick={closeSidebars}>
        {polyglot.t('logo.altText')}
      </Link>
    </div>
  );
}

Logo.propTypes = {
  cssModifier: PropTypes.string,
  closeSidebars: PropTypes.func.isRequired,
  beta: PropTypes.bool,
};

export default withCloseSidebars(Logo);
