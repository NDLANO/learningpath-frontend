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
const statusRequested = { status: 'REQUESTED', action: 'request' };
const statusUnlisted = { status: 'UNLISTED', action: 'unlist' };

export const learningPathStatuses = {
  PRIVATE: [statusUnlisted, statusRequested],
  PUBLISHED: [statusPrivate, statusUnlisted],
  UNLISTED: [statusPrivate, statusRequested],
  REQUESTED: [statusPrivate, statusUnlisted, statusPublished],
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
