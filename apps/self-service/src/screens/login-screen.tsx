import React from 'react';

import { useSsoLogin } from '@lightbridge/hooks';
import { LoginView } from '../views/login-view';

export function LoginScreen() {
  const sso = useSsoLogin();

  return <LoginView onSsoPress={() => sso.mutate()} loading={sso.isPending} />;
}
