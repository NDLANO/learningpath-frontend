import nb from '../locale/phrases/phrases-nb';
import en from '../locale/phrases/phrases-en';

export const NB = { name: 'Bokmål', abbreviation: 'nb', phrases: nb };
export const NN = { name: 'Nynorsk', abbreviation: 'nn', phrases: nb };
export const EN = { name: 'English', abbreviation: 'en', phrases: en };

export const availableLocales = [NB, NN, EN];
export const preferdLocales = [NB, NN, EN];
