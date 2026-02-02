import { createCollection, localOnlyCollectionOptions } from '@tanstack/react-db';

import { ApiKey } from '@lightbridge/api-rest';

export const apiKeysCollection = createCollection(
  localOnlyCollectionOptions<ApiKey>({
    id: 'api-keys',
    getKey: (item: ApiKey) => item.id,
    initialData: [],
  })
);

export function upsertApiKeys(items: ApiKey[] = []) {
  const existingKeys = new Set(apiKeysCollection.keys());
  const nextKeys = new Set(items.map((item) => item.id));
  const keysToDelete = Array.from(existingKeys).filter((key) => !nextKeys.has(key as string));

  if (keysToDelete.length > 0) {
    apiKeysCollection.delete(keysToDelete);
  }

  items.forEach((item) => {
    if (apiKeysCollection.has(item.id)) {
      apiKeysCollection.update(item.id, (draft) => {
        Object.assign(draft, item);
      });
    } else {
      apiKeysCollection.insert(item);
    }
  });
}

export function upsertApiKey(item: ApiKey) {
  if (apiKeysCollection.has(item.id)) {
    apiKeysCollection.update(item.id, (draft) => {
      Object.assign(draft, item);
    });
  } else {
    apiKeysCollection.insert(item);
  }
}

export function removeApiKey(id: string) {
  apiKeysCollection.delete(id);
}
