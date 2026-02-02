import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: isDesktop ? { paddingLeft: 256 } : undefined,
      }}
      tabBar={(props) => <ResponsiveTabBar {...props} />}
    >
      <Tab.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Tab.Screen name="ApiKeys" component={ApiKeysScreen} options={{ title: 'API Keys' }} />
      <Tab.Screen
        name="ApiKeyEditor"
        component={ApiKeyEditorScreen}
        options={{ title: 'Create Key' }}
      />
      <Tab.Screen name="Usage" component={UsageScreen} options={{ title: 'Usage' }} />
    </Tab.Navigator>
  );
}
