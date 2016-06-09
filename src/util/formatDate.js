import format from 'date-fns/format';

/* eslint-disable no-unused-vars*/
export default function formatDate(date, locale) {
  return format(date, 'DD.MM.YY');
}
/* eslint-enable */
