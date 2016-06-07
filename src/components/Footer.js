import React from 'react';
import polyglot from '../i18n';

export default function Footer() {
  return (
    <footer>
      <ul className="footer-list">
        <li className="footer-list-item">
          <a href="http://om.ndla.no/" className="footer-list-item-link">{polyglot.t('footer.aboutNDLA')}</a>
        </li>
        <li className="footer-list-item">
          <a href="http://om.ndla.no/" className="footer-list-item-link">{polyglot.t('footer.aboutLearningPath')}</a>
        </li>
        <li className="footer-list-item">
          <a href="http://om.ndla.no/" className="footer-list-item-link">{polyglot.t('footer.feedback')}</a>
        </li>
        <li className="footer-list-item">
          <a href="http://om.ndla.no/" className="footer-list-item-link">{polyglot.t('footer.privacy')}</a>
        </li>
      </ul>
      <p className="footer-text">
        {polyglot.t('footer.footerInfo')}
      </p>
      <p className="footer-text">
        {polyglot.t('footer.footerEditior')}<strong>Øivind Høines</strong> {polyglot.t('footer.footerIssueResponsible')} <strong>Pål Frønsdal</strong>
      </p>
    </footer>
  );
}
