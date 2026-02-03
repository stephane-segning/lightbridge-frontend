import React from 'react';

import { useRouter } from 'expo-router';
import { useAuthSession, useKeycloakLogin } from '@lightbridge/hooks';
import { keycloakConfig } from '../configs/keycloak-config';
import { LoginView } from '../views/login-view';

export function LoginScreen() {
  const { isAuthenticated } = useAuthSession();
  const { promptAsync, isLoading } = useKeycloakLogin(keycloakConfig);
  const router = useRouter();

  if (isAuthenticated) {
    return null;
  }

  return (
    <LoginView
      onSsoPress={() => promptAsync()}
      onHelpPress={() => router.push('/help')}
      loading={isLoading}
    />
  );
}
