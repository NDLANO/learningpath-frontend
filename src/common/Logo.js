/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import SafeLink from '@ndla/ui/lib/common/SafeLink';
import classNames from 'classnames';
import polyglot from '../i18n';
import withCloseSidebars from './withCloseSidebars';

function Logo(props) {
  const { cssModifier, closeSidebars } = props;
  const rootClasses = classNames({
    logo: true,
    'un-button': true,
    [`logo--${cssModifier}`]: cssModifier,
  });

  return (
    <div className={rootClasses}>
      <SafeLink to="/" className="logo_link" onClick={closeSidebars}>
        {polyglot.t('logo.altText')}
      </SafeLink>
    </div>
  );
}

Logo.propTypes = {
  cssModifier: PropTypes.string,
  closeSidebars: PropTypes.func.isRequired,
};

export default withCloseSidebars(Logo);
