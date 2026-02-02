import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import { useApiKey, useCreateApiKey, useUpdateApiKey } from '@lightbridge/hooks';
import { ApiKeyFormView } from '../views/api-key-form-view';
import type { TabParamList } from '../navigation/types';

type Route = RouteProp<TabParamList, 'ApiKeyEditor'>;

export function ApiKeyEditorScreen() {
  const route = useRoute<Route>();
  const apiKeyId = route.params?.id ?? null;
  const { data } = useApiKey(apiKeyId);
  const createKey = useCreateApiKey();
  const updateKey = useUpdateApiKey();
  const [name, setName] = useState('');

  useEffect(() => {
    if (data?.name) {
      setName(data.name);
    }
  }, [data?.name]);

  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }

    if (apiKeyId) {
      updateKey.mutate({ id: apiKeyId, input: { name } });
    } else {
      createKey.mutate({ name });
      setName('');
    }
  };

  return (
    <ApiKeyFormView
      name={name}
      onNameChange={setName}
      onSubmit={handleSubmit}
      loading={createKey.isPending || updateKey.isPending}
    />
  );
}
