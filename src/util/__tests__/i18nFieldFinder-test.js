import test from 'tape';

import { oembedContentI18N, pushOrAssignLanguageValue } from '../i18nFieldFinder';

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
