import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuthSession } from '@lightbridge/hooks';
import { useTranslation } from 'react-i18next';
import { LoginScreen } from '../screens/login-screen';
import { ApiKeysScreen } from '../screens/api-keys-screen';
import { ApiKeyEditorScreen } from '../screens/api-key-editor-screen';
import { UsageScreen } from '../screens/usage-screen';
import { ResponsiveTabBar } from './responsive-tab-bar';
import { useIsDesktop } from './use-is-desktop';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabsNavigator() {
  const isDesktop = useIsDesktop();
  const { isAuthenticated } = useAuthSession();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: isDesktop ? { paddingLeft: 256 } : undefined,
      }}
      tabBar={(props) => <ResponsiveTabBar {...props} />}
    >
      {isAuthenticated ? (
        <>
          <Tab.Screen
            name="ApiKeys"
            component={ApiKeysScreen}
            options={{ title: t('nav.apiKeys') }}
          />
          <Tab.Screen
            name="ApiKeyEditor"
            component={ApiKeyEditorScreen}
            options={{ title: t('nav.apiKeyEditor') }}
          />
          <Tab.Screen name="Usage" component={UsageScreen} options={{ title: t('nav.usage') }} />
        </>
      ) : (
        <Tab.Screen name="Login" component={LoginScreen} options={{ title: t('nav.login') }} />
      )}
    </Tab.Navigator>
  );
}
