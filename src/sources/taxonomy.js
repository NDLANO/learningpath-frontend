import fetch from "./fetch";
import { resolveJsonOrRejectWithError, apiResourceUrl } from "./helpers";

const baseUrl = apiResourceUrl("/taxonomy/v1");

export const fetchResource = (articleId) =>
  fetch(`${baseUrl}/nodes?contentURI=urn:article:${articleId}&language=nb`).then(resolveJsonOrRejectWithError);
