/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import polyglot from '../i18n';

export default function formatDuration(duration) {
  if (duration <= 0 || isNaN(duration)) {
    return polyglot.t('duration.zero');
  }

  return [polyglot.t('duration.hours', { smart_count: Math.floor(duration / 60) }),
    polyglot.t('duration.minutes', { smart_count: duration % 60 }),
  ].filter(s => s.indexOf('0') !== 0).join(' ').trim();
}
