import { fetchAuth } from './fetchAuth';
import { resolveJsonOrRejectWithError } from './helpers';

export const fetchOwners = ownerIds =>
  fetchAuth(`/get_owners?ownerIds=${ownerIds.join(',')}`).then(
    resolveJsonOrRejectWithError,
  );
