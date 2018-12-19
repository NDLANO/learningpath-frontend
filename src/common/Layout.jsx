/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ZendeskButton from '@ndla/zendesk';
import polyglot from '../i18n';
import SelectLocale from '../locale/SelectLocale';
import config from '../config';

export const Wrapper = ({ children }) => (
  <div className="wrapper">{children}</div>
);
export const OneColumn = ({ children, className }) => (
  <div className={className ? `one-column ${className}` : 'one-column'}>
    {children}
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node,
};

OneColumn.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const Footer = ({ locale }) => (
  <footer className="footer">
    <form className="footer_language-form">
      <label
        className="footer_language-label footer--bold"
        htmlFor="language-select">
        {polyglot.t('footer.selectLanguage')}
      </label>
      <SelectLocale id="language-select" className="footer_language-select" />
    </form>
    <ul className="footer_list footer--bold">
      <li className="footer_item">
        <a
          href="https://om.ndla.no/"
          className="footer_link"
          data-cy="footer-about-ndla">
          {polyglot.t('footer.aboutNDLA')}
        </a>
      </li>
    </ul>
    <div className="footer_ruler" />
    <p className="footer_text">
      <span className="footer_editor">
        {polyglot.t('footer.footerEditiorInChief')}
        <strong>Christer Gundersen</strong>
      </span>
      <span className="footer_editor">
        {polyglot.t('footer.footerManagingEditor')}{' '}
        <strong>Pål Frønsdal</strong>
      </span>
    </p>
    {config.zendeskWidgetKey && (
      <ZendeskButton
        locale={locale}
        style={{ bottom: '5.5rem' }}
        widgetKey={config.zendeskWidgetKey}>
        {polyglot.t('askNDLA')}
      </ZendeskButton>
    )}
    <p className="footer_text">{polyglot.t('footer.footerInfo')}</p>
  </footer>
);

Footer.propTypes = {
  locale: PropTypes.string.isRequired,
};
