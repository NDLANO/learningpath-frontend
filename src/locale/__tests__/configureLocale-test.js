import test from 'tape';

import { configureLocale, getHtmlLang, isValidLocale } from '../configureLocale';

test('configureLocale configureLocale()', (t) => {
  t.equal(configureLocale('en').currentLocale, 'en');
  t.equal(configureLocale('en').phrases['footer.aboutNDLA'], 'About NDLA');

  t.equal(configureLocale('nb').currentLocale, 'nb');
  t.equal(configureLocale('nb').phrases['footer.aboutNDLA'], 'Om NDLA');

  // Defaults to nb if locale not found
  t.equal(configureLocale('ru').currentLocale, 'nb');
  t.equal(configureLocale('ru').phrases['footer.aboutNDLA'], 'Om NDLA');

  t.end();
});

test('configureLocale isValidLocale()', (t) => {
  t.equal(isValidLocale('nb'), true);
  t.equal(isValidLocale('nn'), true);
  t.equal(isValidLocale('en'), true);
  t.equal(isValidLocale('aa'), false);
  t.equal(isValidLocale('ub'), false);
  t.end();
});

test('configureLocale getHtmlLang()', (t) => {
  t.equal(getHtmlLang('nb'), 'nb');
  t.equal(getHtmlLang('nn'), 'nn');
  t.equal(getHtmlLang('en'), 'en');
  t.equal(getHtmlLang('aa'), 'nb');
  t.end();
});
