import { urlIsProductionNDLA } from '../Oembed';

test('component/Oembed urlIsNDLA', () => {
  expect(urlIsProductionNDLA('http://ndla.no/nb/node/12345')).toBeTruthy();
  expect(
    urlIsProductionNDLA('http://exampe.com/ndla.no/nb/node/12345'),
  ).toBeFalsy();
  expect(urlIsProductionNDLA()).toBeFalsy();
});
