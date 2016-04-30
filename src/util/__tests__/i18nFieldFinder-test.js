import test from 'tape';

import { oembedContentI18N } from '../i18nFieldFinder';

test('util/i18nFIeldFinder oembedContentI18N', t => {
  t.equal(typeof oembedContentI18N, 'function');

  let learningPathStep = {
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
