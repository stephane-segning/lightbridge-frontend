import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useDeleteApiKey } from '@lightbridge/hooks';
import { DeleteApiKeyView } from '../views/delete-api-key-view';
import type { RootStackParamList } from '../navigation/types';

type Route = RouteProp<RootStackParamList, 'DeleteApiKey'>;

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function DeleteApiKeyModal() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Navigation>();
  const removeKey = useDeleteApiKey();

  const handleConfirm = async () => {
    await removeKey.mutateAsync(route.params.id);
    navigation.goBack();
  };

  return (
    <DeleteApiKeyView
      name={route.params.name}
      loading={removeKey.isPending}
      onCancel={() => navigation.goBack()}
      onConfirm={handleConfirm}
    />
  );
}
