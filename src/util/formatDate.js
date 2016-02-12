import moment from 'moment';

export default function formatDate (date, locale) {
  return moment(date).format('DD.MM.YY');
}
