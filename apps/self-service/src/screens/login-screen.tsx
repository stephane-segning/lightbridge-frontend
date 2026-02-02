import React from 'react';

import { useAuthSession, useKeycloakLogin } from '@lightbridge/hooks';
import { useNavigation } from '@react-navigation/native';
import { keycloakConfig } from '../app/keycloak-config';
import { LoginView } from '../views/login-view';
import type { RootStackParamList } from '../navigation/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function LoginScreen() {
  const { isAuthenticated } = useAuthSession();
  const { promptAsync, isLoading } = useKeycloakLogin(keycloakConfig);
  const navigation = useNavigation<Navigation>();

  if (isAuthenticated) {
    return null;
  }

  return (
    <LoginView
      onSsoPress={() => promptAsync()}
      onHelpPress={() => navigation.navigate('Help')}
      loading={isLoading}
    />
  );
}
