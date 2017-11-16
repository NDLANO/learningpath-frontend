/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { convertToHTML } from 'draft-convert';

export function convertDraftJsToHtml(contentState) {
  return !contentState || !contentState.hasText()
    ? ''
    : convertToHTML({
        styleToHTML: style => {
          if (style === 'UNDERLINE') {
            return <u />;
          }
          return undefined;
        },
      })(contentState);
}
