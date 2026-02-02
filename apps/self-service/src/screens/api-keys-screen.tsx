import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useApiKeys } from '@lightbridge/hooks';
import { ApiKeysListView } from '../views/api-keys-list-view';
import type { RootStackParamList, TabParamList } from '../navigation/types';

type RootNav = NativeStackNavigationProp<RootStackParamList>;

type TabNav = BottomTabNavigationProp<TabParamList>;

export function ApiKeysScreen() {
  const { data = [] } = useApiKeys();
  const rootNavigation = useNavigation<RootNav>();
  const tabNavigation = useNavigation<TabNav>();

  return (
    <ApiKeysListView
      items={data}
      onCreate={() => tabNavigation.navigate('ApiKeyEditor')}
      onEdit={(id) => tabNavigation.navigate('ApiKeyEditor', { id })}
      onDelete={(id, name) => rootNavigation.navigate('DeleteApiKey', { id, name })}
    />
  );
}
