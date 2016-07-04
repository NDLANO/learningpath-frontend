import { createSelector } from 'reselect';

const getLocaleFromState = (state) => state.locale;

export const getLocale = createSelector(
    [getLocaleFromState],
    (locale) => locale
);
