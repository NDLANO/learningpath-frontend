import { fetchAuth } from './fetchAuth';
import { resolveJsonOrRejectWithError } from './helpers';

export const fetchOwners = () =>
  fetchAuth("/get_owners"
  ).then(resolveJsonOrRejectWithError);
