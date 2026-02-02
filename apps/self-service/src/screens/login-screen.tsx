import React from 'react';

import { useAuthSession, useKeycloakLogin } from '@lightbridge/hooks';
import { keycloakConfig } from '../app/keycloak-config';
import { LoginView } from '../views/login-view';

export function LoginScreen() {
  const { isAuthenticated } = useAuthSession();
  const { promptAsync, isLoading } = useKeycloakLogin(keycloakConfig);

  if (isAuthenticated) {
    return null;
  }

  return <LoginView onSsoPress={() => promptAsync()} loading={isLoading} />;
}
