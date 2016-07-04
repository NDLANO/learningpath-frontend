import test from 'tape';

import { oembedContentI18N, titleI18N } from '../i18nFieldFinder';

test('util/i18nFieldFinder titleI18N', t => {
  const learningPathStep = {
    title: [
      {title: 'Bokmål', language: 'nb'},
      {title: 'Nynorsk', language: 'nn'},
      {title: 'English', language: 'en'}
    ]
  };

  t.deepEqual(titleI18N(learningPathStep, 'nb'), 'Bokmål');
  t.deepEqual(titleI18N(learningPathStep, 'nn'), 'Nynorsk');
  t.deepEqual(titleI18N(learningPathStep, 'en'), 'English');
  t.deepEqual(titleI18N(learningPathStep, 'es'), undefined);

  t.end();
});

test('util/i18nFieldFinder titleI18N with fallback', t => {
  const learningPathStep1 = {
    title: [
      {title: 'Bokmål', language: 'nb'},
      {title: 'English', language: 'en'}
    ]
  };

  t.deepEqual(titleI18N(learningPathStep1, 'nb', true), 'Bokmål');
  t.deepEqual(titleI18N(learningPathStep1, 'en', true), 'English');
  t.deepEqual(titleI18N(learningPathStep1, 'nn', true), 'Bokmål');

  const learningPathStep2 = {
    title: [
      {title: 'English', language: 'en'}
    ]
  };

  t.deepEqual(titleI18N(learningPathStep2, 'nb', true), 'English');
  t.deepEqual(titleI18N(learningPathStep2, 'en', true), 'English');
  t.deepEqual(titleI18N(learningPathStep2, 'es', true), 'English');

  t.end();
});

test('util/i18nFieldFinder oembedContentI18N', t => {
  t.equal(typeof oembedContentI18N, 'function');

  const learningPathStep = {
    embedContent: [
      { url: 'http://example.com/sv', html: '<iframe src="http://example.com/sv">', width: 500, language: 'sv' },
      { url: 'http://example.com', html: '<iframe src="http://example.com">', width: 500, language: 'nb' }
    ]
  };

  t.deepEqual(oembedContentI18N(learningPathStep, 'nb'),
      { url: 'http://example.com', html: '<iframe src="http://example.com">', width: 500, language: 'nb' });

  t.notOk(oembedContentI18N(learningPathStep, 'eo'));

  t.end();
});
