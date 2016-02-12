import test from 'tape';

import formatDuration from '../formatDuration';

test('util/formatDuration', t => {
  t.equal(typeof formatDuration, 'function');

  t.equal(formatDuration(1,  'nb'),  '1 minutt');
  t.equal(formatDuration(30, 'nb'),  '30 minutter');
  t.equal(formatDuration(59, 'nb'),  '59 minutter');
  t.equal(formatDuration(60, 'nb'),  '1 time');
  t.equal(formatDuration(120, 'nb'), '2 timer');

  t.equal(formatDuration(135, 'nb'), '2 timer 15 minutter');
  t.equal(formatDuration(115, 'nb'), '1 time 55 minutter');
  t.equal(formatDuration(121, 'nb'), '2 timer 1 minutt');

  t.equal(formatDuration(0,  'nb'),   'ukjent lenge');
  t.equal(formatDuration(-1,  'nb'),  'ukjent lenge');
  t.equal(formatDuration(NaN,  'nb'), 'ukjent lenge');

  t.end();
});

