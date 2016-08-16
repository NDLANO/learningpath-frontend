/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import polyglot from '../i18n';
import SelectLocale from '../locale/SelectLocale';

export const Wrapper = ({ children }) => <div className="wrapper">{children}</div>;
export const OneColumn = ({ children }) => <div className="one-column">{children}</div>;

export const Footer = () =>
  <footer>
    <ul className="footer_list">
      <li className="footer_item">
        <a href="http://om.ndla.no/" className="footer_link">{polyglot.t('footer.aboutNDLA')}</a>
      </li>
      <li className="footer_item">
        <a href="http://om.ndla.no/" className="footer_link">{polyglot.t('footer.aboutLearningPath')}</a>
      </li>
      <li className="footer_item">
        <a href="http://om.ndla.no/" className="footer_link">{polyglot.t('footer.feedback')}</a>
      </li>
      <li className="footer_item">
        <a href="http://om.ndla.no/" className="footer_link">{polyglot.t('footer.privacy')}</a>
      </li>
    </ul>
    <p className="footer_text">
      {polyglot.t('footer.selectLanguage')} <SelectLocale />
    </p>
    <p className="footer_text">
      {polyglot.t('footer.footerInfo')}
    </p>
    <p className="footer_text">
      {polyglot.t('footer.footerEditior')}<strong>Øivind Høines</strong> {polyglot.t('footer.footerIssueResponsible')} <strong>Pål Frønsdal</strong>
    </p>
  </footer>;
