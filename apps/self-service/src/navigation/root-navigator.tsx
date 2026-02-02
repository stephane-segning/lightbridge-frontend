import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthSession } from '@lightbridge/hooks';
import { TabsNavigator } from './tabs-navigator';
import { DeleteApiKeyModal } from '../screens/delete-api-key-modal';
import type { RootStackParamList } from './types';
import { useTranslation } from 'react-i18next';
import { LoginScreen } from '../screens/login-screen';
import { HelpScreen } from '../screens/help-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated } = useAuthSession();
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
          <Stack.Screen
            name="DeleteApiKey"
            component={DeleteApiKeyModal}
            options={{ presentation: 'modal', title: t('deleteKey.title') }}
          />
          <Stack.Screen name="Help" component={HelpScreen} options={{ title: t('help.title') }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Help" component={HelpScreen} options={{ title: t('help.title') }} />
        </>
      )}
    </Stack.Navigator>
  );
}
