/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const getDimensionsCodes = {
  13: {
    ga: 'dimension13',
    gtm: 'CustDimStiLengde',
  },
  14: {
    ga: 'dimension14',
    gtm: 'CustDimStiSteg',
  },
};

export const convertToGaOrGtmDimension = (dimensions, type) => {
  const newDimensions = {};
  Object.keys(dimensions).forEach(key => {
    Object.assign(newDimensions, {
      [getDimensionsCodes[key][type]]: dimensions[key],
    });
  });
  return newDimensions;
};
