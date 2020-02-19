import { fetchAuth } from './fetchAuth';
import { resolveJsonOrRejectWithError } from './helpers';

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const chunk = (owners, size) => {
  const chunks = [];
  let index = 0;
  while (index < owners.length) {
    chunks.push(owners.slice(index, size + index));
    index += size;
  }
  return chunks;
};

export const fetchOwners = async ownerIds => {
  const owners = ownerIds.filter(unique);
  const chunks = chunk(owners, 100);

  let requests = [];
  chunks.forEach(chunk => {
    const result = fetchAuth(`/get_owners?ownerIds=${chunk.join(',')}`).then(
      resolveJsonOrRejectWithError,
    );
    requests.push(result);
  });
  const results = await Promise.all(requests);
  return results.reduce((acc, res) => [...acc, ...res], []);
};
