/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import polyglot from '../i18n';
import config from '../config';

const zendeskHost = __SERVER__ ? config.zendeskHost : window.config.zendeskHost;

const ZendeskButton = () =>
  zendeskHost ? (
    <button
      onClick={() => (window && window.zE ? window.zE.activate() : undefined)}
      className="c-zendesk__button">
      {polyglot.t('askNDLA')}
    </button>
  ) : null;

export default ZendeskButton;
