import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import * as WebBrowser from 'expo-web-browser';

import './global.css';
import { I18nProvider } from '@lightbridge/i18n';
import { useAuthHydration, useBackendSync, useLocaleSync } from '@lightbridge/hooks';
import { AppFont, useAppFonts } from '@lightbridge/ui';
import { queryClient } from './src/app/query-client';
import { RootNavigator } from './src/navigation/root-navigator';
import { useClientInit } from '@lightbridge/api-rest';

WebBrowser.maybeCompleteAuthSession();

enableScreens();

export default function App() {
  useClientInit({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    auth: async (_a) => {
      return '<token />';
    },
  });

  const fontsLoaded = useAppFonts([AppFont.MontserratRegular, AppFont.MontserratSemiBold]);
  useAuthHydration();
  useBackendSync();
  useLocaleSync();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </I18nProvider>
  );
}
