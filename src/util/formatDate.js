import moment from 'moment';

/* eslint-disable no-unused-vars*/
export default function formatDate(date, locale) {
  return moment(date).format('DD.MM.YY');
}
/* eslint-enable */
