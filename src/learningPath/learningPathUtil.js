/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { convertFieldWithFallback } from '../util/convertFieldWithFallback';

const statusPrivate = { status: 'PRIVATE', action: 'unpublish' };
const statusPublished = { status: 'PUBLISHED', action: 'publish', admin: true };
const statusSubmitted = { status: 'SUBMITTED', action: 'submit' };
const statusUnlisted = { status: 'UNLISTED', action: 'unlist' };

export const learningPathStatuses = {
  PRIVATE: [statusUnlisted, statusSubmitted],
  PUBLISHED: [statusPrivate, statusUnlisted],
  UNLISTED: [statusPrivate, statusSubmitted],
  SUBMITTED: [statusPrivate, statusUnlisted, statusPublished],
};

export const convertLearningPath = learningPath => ({
  ...learningPath,
  title: convertFieldWithFallback(learningPath, 'title', ''),
  description: convertFieldWithFallback(learningPath, 'description', ''),
  learningsteps: learningPath.learningsteps
    ? learningPath.learningsteps.map(step => ({
        ...step,
        title: convertFieldWithFallback(step, 'title', ''),
      }))
    : [],
  tags: convertFieldWithFallback(learningPath, 'tags', []),
});

export const learningPathStatusFromStatus = (status) => {
  switch (status) {
    case statusPrivate.status:
      return statusSubmitted;
    case statusUnlisted.status:
      return statusSubmitted;
    case statusPublished.status:
      return statusPrivate;
    case statusSubmitted.status:
      return statusUnlisted;
    default:
      return statusPrivate;
  }
};
