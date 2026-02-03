import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import * as WebBrowser from 'expo-web-browser';

import '../../global.css';
import { I18nProvider } from '@lightbridge/i18n';
import {
  useAuthHydration,
  useAuthSession,
  useBackendSync,
  useLocaleSync,
} from '@lightbridge/hooks';
import { AppFont, useAppFonts } from '@lightbridge/ui';
import { queryClient } from '@app/configs/query-client';
import { useClientInit } from '@lightbridge/api-rest';
import { apiConfig } from '@app/configs/api-config';

WebBrowser.maybeCompleteAuthSession();
enableScreens();

export default function RootLayout() {
  useClientInit({
    baseURL: apiConfig.backendUrl,
    auth: async (_a) => {
      return '<token />';
    },
  });

  const { isAuthenticated } = useAuthSession();
  const { isHydrated } = useAuthHydration();
  const fontsLoaded = useAppFonts([AppFont.MontserratRegular, AppFont.MontserratSemiBold]);

  useBackendSync();
  useLocaleSync();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const [first] = segments;
    const inAuthGroup = first === '(auth)';
    const inHelpRoute = first === 'help';

    if (!isAuthenticated && !inAuthGroup && !inHelpRoute) {
      router.replace('/login');
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace('/api-keys');
    }
  }, [isAuthenticated, isHydrated, router, segments]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </I18nProvider>
  );
}
