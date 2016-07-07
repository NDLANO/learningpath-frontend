import React, { PropTypes } from 'react';
import { apiResourceUrl, locationOrigin } from '../sources/helpers';
import polyglot from '../i18n';

const query = `?successUrl=${locationOrigin}/login/success/{appkey}&failureUrl=${locationOrigin}/login/failure`;

export default function LoginProviders({ message }) {
  let messageEl;
  if (message) {
    messageEl = <p>{message}</p>;
  }

  return (
    <div className="one-column one-column--narrow">
      <h3>{polyglot.t('loginProviders.description')}</h3>
      {messageEl}
      <ul className="vertical-menu">
        <li className="vertical-menu_item"><a className="cta-link cta-link--block cta-link--gl" href={apiResourceUrl(`/auth/login/google${query}`)}>Google</a></li>
        <li className="vertical-menu_item"><a className="cta-link cta-link--block cta-link--fb" href={apiResourceUrl(`/auth/login/facebook${query}`)}>Facebook</a></li>
        <li className="vertical-menu_item"><a className="cta-link cta-link--block cta-link--tw" href={apiResourceUrl(`/auth/login/twitter${query}`)}>Twitter</a></li>
      </ul>
    </div>
  );
}

LoginProviders.propTypes = {
  message: PropTypes.string,
};
