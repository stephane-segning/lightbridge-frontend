import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import * as WebBrowser from 'expo-web-browser';

import './global.css';
import { useAuthHydration } from '@lightbridge/hooks';
import { queryClient } from './src/app/query-client';
import { RootNavigator } from './src/navigation/root-navigator';
import { useBackendSync } from './src/app/use-backend-sync';

WebBrowser.maybeCompleteAuthSession();

enableScreens();

export default function App() {
  useAuthHydration();
  useBackendSync();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
