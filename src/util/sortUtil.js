/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

export const sortPaths = (paths, field) => {
  switch (field) {
    case 'title':
      return sortBy(paths, p => p.title);

    case 'lastUpdated':
      return sortBy(paths, field);

    case '-lastUpdated':
      return reverse(sortBy(paths, 'lastUpdated'));

    case 'status':
      return reverse(sortBy(paths, 'status'));

    default:
      return sortBy(paths, field);
  }
};
