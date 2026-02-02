import { useMemo } from 'react';
import { useLiveQuery } from '@tanstack/react-db';

import type { ApiKey, CreateApiKeyInput, UpdateApiKeyInput } from '@lightbridge/api-rest';
import { createApiKey, deleteApiKey, listApiKeys, updateApiKey } from '@lightbridge/api-rest';
import { apiKeysCollection, removeApiKey, upsertApiKey, upsertApiKeys } from './data/api-keys-store';

export function useApiKeys() {
  const { data } = useLiveQuery((q) => q.from({ apiKeys: apiKeysCollection }));

  const items = useMemo<ApiKey[]>(() => {
    if (Array.isArray(data)) {
      return data as ApiKey[];
    }
    return [];
  }, [data]);

  return { data: items };
}

export async function refreshApiKeys() {
  const items = await listApiKeys();
  upsertApiKeys(items);
  return items;
}

export function useCreateApiKey() {
  return {
    isPending: false,
    mutate: async (input: CreateApiKeyInput) => {
      const next = await createApiKey(input);
      upsertApiKey(next);
      return next;
    },
  };
}

export function useUpdateApiKey() {
  return {
    isPending: false,
    mutate: async ({ id, input }: { id: string; input: UpdateApiKeyInput }) => {
      const updated = await updateApiKey(id, input);
      upsertApiKey(updated);
      return updated;
    },
  };
}

export function useDeleteApiKey() {
  return {
    isPending: false,
    mutateAsync: async (id: string) => {
      await deleteApiKey(id);
      removeApiKey(id);
    },
  };
}
