import { urlIsNDLA } from '../Oembed';

test('component/Oembed urlIsNDLA', () => {
  expect(urlIsNDLA('http://ndla.no/nb/node/12345')).toBeTruthy();
  expect(urlIsNDLA('http://exampe.com/ndla.no/nb/node/12345')).toBeFalsy();
  expect(urlIsNDLA()).toBeFalsy();
});
