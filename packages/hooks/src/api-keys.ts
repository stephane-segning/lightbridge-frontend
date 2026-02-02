import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ApiKey, CreateApiKeyInput, UpdateApiKeyInput } from '@lightbridge/api-rest';
import {
  createApiKey,
  deleteApiKey,
  getApiKey,
  listApiKeys,
  updateApiKey,
} from '@lightbridge/api-rest';

const apiKeysKey = ['api-keys'] as const;

export function useApiKeys() {
  return useQuery({
    queryKey: apiKeysKey,
    queryFn: listApiKeys,
  });
}

export function useApiKey(id: string | null) {
  return useQuery({
    queryKey: ['api-key', id],
    queryFn: () => (id ? getApiKey(id) : Promise.resolve(null)),
  });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateApiKeyInput) => createApiKey(input),
    onSuccess: (next: ApiKey) => {
      queryClient.setQueryData<ApiKey[]>(apiKeysKey, (prev) => [next, ...(prev ?? [])]);
    },
  });
}

export function useUpdateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateApiKeyInput }) =>
      updateApiKey(id, input),
    onSuccess: (updated) => {
      queryClient.setQueryData<ApiKey[]>(apiKeysKey, (prev) =>
        (prev ?? []).map((item) => (item.id === updated.id ? updated : item))
      );
      queryClient.setQueryData(['api-key', updated.id], updated);
    },
  });
}

export function useDeleteApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteApiKey(id),
    onSuccess: (_result, id) => {
      queryClient.setQueryData<ApiKey[]>(apiKeysKey, (prev) =>
        (prev ?? []).filter((item) => item.id !== id)
      );
    },
  });
}
