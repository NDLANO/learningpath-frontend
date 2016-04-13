import polyglot from '../i18n';

export default function formatDuration(duration, locale) {
  if (duration <= 0 || isNaN(duration)) {
    return polyglot.t('duration.zero');
  }

  return [polyglot.t('duration.hours', {smart_count: Math.floor(duration / 60)}),
      polyglot.t('duration.minutes', {smart_count: duration % 60})
      ].filter(s => s.indexOf('0') !== 0).join(' ').trim();
}
