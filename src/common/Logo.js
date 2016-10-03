/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import polyglot from '../i18n';
import withCloseSidebars from '../common/withCloseSidebars';

function Logo(props) {
  const { cssModifier, closeSidebars } = props;
  const rootClasses = classNames({
    logo: true,
    [`logo--${cssModifier}`]: cssModifier,
  });

  return (
    <h1 className={rootClasses} onClick={closeSidebars}>
      <Link to="/" className="logo_link">{polyglot.t('logo.altText')}</Link>
    </h1>
  );
}

Logo.propTypes = {
  cssModifier: PropTypes.string,
  closeSidebars: PropTypes.func.isRequired,
};


export default withCloseSidebars(Logo);
