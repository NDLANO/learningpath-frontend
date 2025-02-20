/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import nb from "./phrases/phrases-nb";
import nn from "./phrases/phrases-nn";
import en from "./phrases/phrases-en";
import sma from "./phrases/phrases-sma";
import se from "./phrases/phrases-se";

export const NB = { name: "Bokmål", abbreviation: "nb", phrases: nb };
export const NN = { name: "Nynorsk", abbreviation: "nn", phrases: nn };
export const EN = { name: "English", abbreviation: "en", phrases: en };
export const SMA = { name: "Åarjelsaemien", abbreviation: "sma", phrases: sma };
export const SE = { name: "Davvisámegiella", abbreviation: "se", phrases: se };

export const availableLocales = [NB, NN, EN, SMA, SE];
export const preferdLocales = [NB, NN, EN];
