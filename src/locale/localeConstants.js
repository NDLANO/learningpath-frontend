/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import nb from './phrases/phrases-nb';
import nn from './phrases/phrases-nn';
import en from './phrases/phrases-en';

export const NB = { name: 'Bokmål', abbreviation: 'nb', phrases: nb };
export const NN = { name: 'Nynorsk', abbreviation: 'nn', phrases: nn };
export const EN = { name: 'English', abbreviation: 'en', phrases: en };

export const availableLocales = [NB, NN, EN];
export const preferdLocales = [NB, NN, EN];
