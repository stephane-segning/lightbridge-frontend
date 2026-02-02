import React from 'react';

import { Button, Card, Stack, Text } from '@lightbridge/ui';
import { ScreenShell } from './screen-shell';

export function LoginView({ onSsoPress, loading }: { onSsoPress: () => void; loading?: boolean }) {
  return (
    <ScreenShell title="Login">
      <Card>
        <Stack gap="md">
          <Text intent="body">
            Connect with your organization's SSO provider to continue.
          </Text>
          <Button variant="primary" size="md" disabled={loading} onPress={onSsoPress}>
            {loading ? 'Opening SSO...' : 'Continue with SSO'}
          </Button>
        </Stack>
      </Card>
    </ScreenShell>
  );
}
