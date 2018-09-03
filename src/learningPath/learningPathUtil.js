/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { convertFieldWithFallback } from '../util/convertFieldWithFallback';

export const learningPathStatuses = [
  { status: 'PRIVATE', action: 'unpublish' },
  { status: 'UNLISTED', action: 'unlist' },
  { status: 'PUBLISHED', action: 'publish', admin: true },
  { status: 'REQUESTED', action: 'request' },
];

export const convertLearningPath = (learningPath) => ({
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
  })
