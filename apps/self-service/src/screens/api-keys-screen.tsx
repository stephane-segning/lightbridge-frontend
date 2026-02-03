import React from 'react';
import { useRouter } from 'expo-router';
import { useApiKeys } from '@lightbridge/hooks';
import { ApiKeysListView } from '../views/api-keys-list-view';

export function ApiKeysScreen() {
  const { data = [] } = useApiKeys();
  const router = useRouter();

  return (
    <ApiKeysListView
      items={data}
      onCreate={() => router.push('/api-key-editor')}
      onEdit={(id) => router.push({ pathname: '/api-key-editor', params: { id } })}
      onDelete={(id, name) => router.push({ pathname: '/delete-api-key', params: { id, name } })}
    />
  );
}
