import { fetchAuth } from '../sources/fetchAuth';
import { resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const baseUrl = apiResourceUrl('/taxonomy/v1');

export const fetchResource = articleId =>
  fetchAuth(
    `${baseUrl}/queries/resources?contentURI=urn:article:${articleId}&language=nb`,
  ).then(resolveJsonOrRejectWithError);
