import test from 'tape';

import { getLocale } from '../localeSelectors';

test('localeSelectors', (t) => {
  const state = {
    locale: 'nb'
  };

  t.equal(getLocale(state), 'nb');

  t.end();
});
