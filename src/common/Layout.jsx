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
    <div className="footer_info_wrapper">
      <p className="footer_text">
        <span className="footer_editor">
          {polyglot.t('footer.footerEditiorInChief')}
          <strong>Sigurd Trageton</strong>
        </span>
      </p>
      <p className="footer_text">{polyglot.t('footer.footerInfo')}</p>
      <div className="footer_about_links">
        <a href="https://om.ndla.no/gdpr" className="footer_link">
          {polyglot.t('footer.privacy')}
        </a>
        <span aria-hidden={true}>|</span>
        <a href="https://om.ndla.no/cookies" className="footer_link">
          {polyglot.t('footer.cookies')}
        </a>
        <span aria-hidden={true}>|</span>
        <a
          href="https://uustatus.no/nn/erklaringer/publisert/057e3661-555c-4b30-8d8c-fcd8e1bd9f5b"
          className="footer_link">
          {polyglot.t('footer.accessibility')}
        </a>
      </div>
    </div>
    <div className="footer_about_links" />
    {config.zendeskWidgetKey && (
      <ZendeskButton
        locale={locale}
        style={{ bottom: '5.5rem' }}
        widgetKey={config.zendeskWidgetKey}>
        {polyglot.t('askNDLA')}
      </ZendeskButton>
    )}
  </footer>
);

Footer.propTypes = {
  locale: PropTypes.string.isRequired,
};
