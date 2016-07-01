import polyglot from '../i18n';
import { availableLocales, NB } from './localeConstants';

export const configureLocale = (localeAbbreviation) => {
  const locale = availableLocales.find(l => l.abbreviation === localeAbbreviation);

  if (locale) {
    polyglot.locale(locale.abbreviation);
    polyglot.replace(locale.phrases);
    return polyglot;
  }

  // defaults to NB
  polyglot.locale(NB.abbreviation);
  polyglot.replace(NB.phrases);
  return polyglot;
};

export const isValidLocale = (localeAbbreviation) => availableLocales.find(l => l.abbreviation === localeAbbreviation) !== undefined;
