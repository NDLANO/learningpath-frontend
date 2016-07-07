import React from 'react';
import polyglot from '../i18n';
import SelectLocale from '../locale/SelectLocale';

export const Wrapper = ({ children }) => <div className="wrapper">{children}</div>;
export const Content = ({ children }) => <div className="content">{children}</div>;

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
