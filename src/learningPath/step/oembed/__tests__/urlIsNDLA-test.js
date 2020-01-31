import { urlIsNDLAUrl } from '../Oembed';

test('component/Oembed urlIsNDLA', () => {
  expect(urlIsNDLAUrl('http://ndla.no/nb/node/12345')).toBeTruthy();
  expect(urlIsNDLAUrl('http://www.ndla.no/nb/node/12345')).toBeTruthy();
  expect(
    urlIsNDLAUrl('http://ndla-frontend.api.ndla.no/nb/node/12345'),
  ).toBeTruthy();

  expect(urlIsNDLAUrl('http://test.ndla.no/nb/node/12345')).toBeTruthy();
  expect(urlIsNDLAUrl('http://www.test.ndla.no/nb/node/12345')).toBeTruthy();
  expect(
    urlIsNDLAUrl('http://ndla-frontend.test.api.ndla.no/nb/node/12345'),
  ).toBeTruthy();

  expect(urlIsNDLAUrl('http://exampe.com/ndla.no/nb/node/12345')).toBeFalsy();

  expect(urlIsNDLAUrl()).toBeFalsy();
});
