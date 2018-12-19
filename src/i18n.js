/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Polyglot from 'node-polyglot';
import phrases from './locale/phrases/phrases-nb';
import { getHtmlLang, isValidLocale } from './locale/configureLocale';

export function getLocaleInfoFromPath(path) {
  const paths = path.split('/');
  const basename = isValidLocale(paths[1]) ? paths[1] : '';
  const basepath = basename ? path.replace(`/${basename}`, '') : path;
  return {
    basepath,
    basename,
    locale: getHtmlLang(basename),
  };
}

export default new Polyglot({ locale: 'nb', phrases });
