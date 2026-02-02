import { createCollection, localOnlyCollectionOptions } from '@tanstack/react-db';

import type { TokenUsage } from '@lightbridge/api-rest';

export const usageCollection = createCollection(
  localOnlyCollectionOptions({
    id: 'token-usage',
    getKey: (item: TokenUsage) => item.date,
    initialData: [],
  })
);

export function setTokenUsage(items: TokenUsage[]) {
  usageCollection.setAll(items);
}
