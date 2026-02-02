import { createCollection, localOnlyCollectionOptions } from '@tanstack/react-db';

import type { ApiKey } from '@lightbridge/api-rest';

export const apiKeysCollection = createCollection(
  localOnlyCollectionOptions({
    id: 'api-keys',
    getKey: (item: ApiKey) => item.id,
    initialData: [],
  })
);

export function upsertApiKeys(items: ApiKey[]) {
  apiKeysCollection.setAll(items);
}

export function upsertApiKey(item: ApiKey) {
  apiKeysCollection.upsert(item);
}

export function removeApiKey(id: string) {
  apiKeysCollection.remove(id);
}
