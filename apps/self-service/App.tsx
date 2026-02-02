import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';

import './global.css';
import { queryClient } from './src/app/query-client';
import { RootNavigator } from './src/navigation/root-navigator';

enableScreens();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
