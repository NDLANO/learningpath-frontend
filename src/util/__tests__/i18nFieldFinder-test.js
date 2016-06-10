import test from 'tape';

import { oembedContentI18N, pushOrAssignLanguageValue, filterFieldsByLanguage } from '../i18nFieldFinder';

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

test('util/i18nFieldFinder pushOrAssignLanguageValue', t => {
  t.equal(typeof pushOrAssignLanguageValue, 'function');

  const learningPathStep = {
    title: [
      { title: 'Korv', language: 'sv' },
      { title: 'Pølse', language: 'nb' },
    ]
  };

  const empty = {
    title: []
  };

  const first = pushOrAssignLanguageValue(empty.title, 'title', 'Wienerpølse', 'nb');
  t.equal(first.length, 1);
  t.equal(first[0].title, 'Wienerpølse');

  const pushed = pushOrAssignLanguageValue(learningPathStep.title, 'title', 'Hot dog', 'gb');
  t.equal(pushed.length, 3);
  t.equal(pushed[2].title, 'Hot dog');

  const assigned = pushOrAssignLanguageValue(learningPathStep.title, 'title', 'Wienerpølse', 'nb');
  t.equal(assigned.length, 2);
  t.equal(assigned[1].title, 'Wienerpølse');

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
