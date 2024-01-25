/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from "query-string";
import formatUrl from "../util/formatUrlUtil";
import fetch from "./fetch";

import { resolveJsonOrRejectWithError, apiResourceUrl } from "./helpers";

const imagesUrl = apiResourceUrl("/image-api/v2/images");

const fetchImages = (query = { "page-size": 16, page: 1 }) => {
  let url = imagesUrl;
  url += `?${queryString.stringify(query)}`;
  return fetch(url).then(resolveJsonOrRejectWithError);
};
const fetchImage = (imageId) => {
  const url = apiResourceUrl(formatUrl("/image-api/v2/images/:imageId", { imageId }));
  return fetch(url).then(resolveJsonOrRejectWithError);
};
const fetchImageWithMetaUrl = (url) => fetch(url).then(resolveJsonOrRejectWithError);

export { fetchImages, fetchImage, fetchImageWithMetaUrl };
