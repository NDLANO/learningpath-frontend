import test from 'tape';

import { oembedContentI18N, titleI18N, filterFieldsByLanguage } from '../i18nFieldFinder';

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

test('util/i18nFieldFinder filterFieldsByLanguage', t => {
  t.equal(typeof filterFieldsByLanguage, 'function');

  const tags = [
    { tag: 'Korv', language: 'sv' },
    { tag: 'Pølse', language: 'nb' },
    { tag: 'Soups', language: 'en' },
    { tag: 'Supper', language: 'nb' },
    { tag: 'Norge', language: 'nb' },
    { tag: 'Learning', language: 'en' },
  ];

  const norwegianTags = filterFieldsByLanguage(tags, 'nb');
  t.equal(norwegianTags.length, 3);
  t.equal(norwegianTags[0].tag, 'Pølse');

  const swedishTags = filterFieldsByLanguage(tags, 'sv');
  t.equal(swedishTags.length, 1);
  t.equal(swedishTags[0].tag, 'Korv');

  const englishTags = filterFieldsByLanguage(tags, 'en');
  t.equal(englishTags.length, 2);
  t.equal(englishTags[0].tag, 'Soups');

  t.end();
});
