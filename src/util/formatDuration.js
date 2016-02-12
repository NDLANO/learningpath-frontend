
function formatMinutes (minutes, locale) {
  switch (minutes) {
  case 0:
    return '';
  case 1:
    return '1 minutt';
  default:
    return minutes +' minutter';
  }
}

function formatHours (hours, locale) {
  switch (hours) {
  case 0:
    return '';
  case 1:
    return '1 time';
  default:
    return hours +' timer';
  }
}

export default function formatDuration(duration, locale) {
  if (duration <= 0 || isNaN(duration)) {
    return 'ukjent lenge';
  }

  return [
    formatHours(Math.floor(duration / 60), locale),
    formatMinutes(duration % 60, locale)
  ].filter(s => s !== '').join(' ').trim();
}
