import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabsNavigator } from './tabs-navigator';
import { DeleteApiKeyModal } from '../screens/delete-api-key-modal';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="DeleteApiKey"
        component={DeleteApiKeyModal}
        options={{ presentation: 'modal', title: 'Delete API key' }}
      />
    </Stack.Navigator>
  );
}
