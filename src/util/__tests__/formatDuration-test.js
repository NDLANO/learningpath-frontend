import test from 'tape';

import formatDuration from '../formatDuration';

test('util/formatDuration', t => {
  t.equal(typeof formatDuration, 'function');

  t.equal(formatDuration(1), '1 minutt');
  t.equal(formatDuration(30), '30 minutter');
  t.equal(formatDuration(59), '59 minutter');
  t.equal(formatDuration(60), '1 time');
  t.equal(formatDuration(120), '2 timer');

  t.equal(formatDuration(135), '2 timer 15 minutter');
  t.equal(formatDuration(115), '1 time 55 minutter');
  t.equal(formatDuration(121), '2 timer 1 minutt');

  t.equal(formatDuration(0), 'Ukjent lengde');
  t.equal(formatDuration(-1), 'Ukjent lengde');
  t.equal(formatDuration(NaN), 'Ukjent lengde');

  t.end();
});
