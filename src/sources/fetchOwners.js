import { fetchAuth } from './fetchAuth';
import { resolveJsonOrRejectWithError } from './helpers';

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const fetchOwners = ownerIds =>
  fetchAuth(`/get_owners?ownerIds=${ownerIds.filter(unique).join(',')}`).then(
    resolveJsonOrRejectWithError,
  );
