import test from 'tape';

import reducer from '../localeReducer';

test('reducers/locale', (t) => {
  t.equal(
    reducer(undefined, {}),
    'nb',
    'initial state'
  );

  t.equal(
    reducer(undefined, { type: 'SET_LOCALE', payload: 'en' }),
    'en',
    'set state'
  );

  t.end();
});
