/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { uuid } from 'ndla-util';
import { apiResourceUrl, locationOrigin } from '../sources/helpers';
import polyglot from '../i18n';
import { setStateUuid } from './sessionActions';

const stateUuid = uuid();

const LoginProviders = ({ message, localSetStateUuid }) => {
  let messageEl;
  if (message) {
    messageEl = <p>{message}</p>;
  }

  const generateNewUuidState = (suuid) => {
    console.log(suuid);
    localSetStateUuid(suuid);
  };

  const query = `?successUrl=${locationOrigin}/login/success&state=${stateUuid}`;

  return (
    <div className="one-column one-column--narrow">
      <h3>{polyglot.t('loginProviders.description')}</h3>
      {messageEl}
      <ul className="vertical-menu">
        <li className="vertical-menu_item"><a onClick={() => generateNewUuidState(stateUuid)} className="cta-link cta-link--block cta-link--gl" href={apiResourceUrl(`/auth/login/google${query}`)}>Google</a></li>
        <li className="vertical-menu_item"><a className="cta-link cta-link--block cta-link--fb" href={apiResourceUrl(`/auth/login/facebook${query}`)}>Facebook</a></li>
        <li className="vertical-menu_item"><a className="cta-link cta-link--block cta-link--tw" href={apiResourceUrl(`/auth/login/twitter${query}`)}>Twitter</a></li>
      </ul>
    </div>
  );
};

LoginProviders.propTypes = {
  message: PropTypes.string,
  localSetStateUuid: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  localSetStateUuid: setStateUuid,
};

export default connect(state => state, mapDispatchToProps)(LoginProviders);
