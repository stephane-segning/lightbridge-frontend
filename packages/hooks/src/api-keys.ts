import { useMemo, useState } from 'react';
import { useLiveQuery } from '@tanstack/react-db';

import type { ApiKey, CreateApiKeyInput, UpdateApiKeyInput } from '@lightbridge/api-rest';
import { createApiKey, deleteApiKey, listApiKeys, updateApiKey } from '@lightbridge/api-rest';
import {
  apiKeysCollection,
  removeApiKey,
  upsertApiKey,
  upsertApiKeys,
} from './data/api-keys-store';

function useApiKeysData() {
  const { data } = useLiveQuery((q) => q.from({ apiKeys: apiKeysCollection }));
  return data;
}

export function useApiKeys() {
  const data = useApiKeysData();
  const items = useMemo<ApiKey[]>(() => {
    if (Array.isArray(data)) {
      return data as ApiKey[];
    }
    return [];
  }, [data]);

  return { data: items };
}

// TODO We cannot get a full list just to take a single item
export function useApiKey(id?: string | null) {
  const data = useApiKeysData();

  const item = useMemo<ApiKey | undefined>(() => {
    if (!id || !Array.isArray(data)) {
      return undefined;
    }
    return (data as ApiKey[]).find((entry) => entry.id === id);
  }, [data, id]);

  return { data: item };
}

export async function refreshApiKeys() {
  const items = await listApiKeys<true>();
  upsertApiKeys(items.data);
  return items;
}

export function useCreateApiKey() {
  const [isPending, setIsPending] = useState(false);

  return {
    isPending,
    mutate: async (input: CreateApiKeyInput) => {
      setIsPending(true);
      try {
        const next = await createApiKey<true>({ body: input });
        upsertApiKey(next.data);
        return next;
      } finally {
        setIsPending(false);
      }
    },
  };
}

export function useUpdateApiKey() {
  const [isPending, setIsPending] = useState(false);

  return {
    isPending,
    mutate: async ({ id, input }: { id: string; input: UpdateApiKeyInput }) => {
      setIsPending(true);
      try {
        const updated = await updateApiKey<true>({
          body: input,
          path: {
            id,
          },
        });
        upsertApiKey(updated.data);
        return updated;
      } finally {
        setIsPending(false);
      }
    },
  };
}

export function useDeleteApiKey() {
  const [isPending, setIsPending] = useState(false);

  return {
    isPending,
    mutateAsync: async (id: string) => {
      setIsPending(true);
      try {
        await deleteApiKey({ path: { id } });
        removeApiKey(id);
      } finally {
        setIsPending(false);
      }
    },
  };
}
