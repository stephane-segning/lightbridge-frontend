import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Card, Stack, Text } from '@lightbridge/ui';
import { ScreenShell } from './screen-shell';

export function LoginView({ onSsoPress, loading }: { onSsoPress: () => void; loading?: boolean }) {
  const { t } = useTranslation();

  return (
    <ScreenShell title={t('login.title')}>
      <Card>
        <Stack gap="md">
          <Text intent="body">{t('login.description')}</Text>
          <Button variant="primary" size="md" disabled={loading} onPress={onSsoPress}>
            {loading ? t('login.ssoLoading') : t('login.sso')}
          </Button>
        </Stack>
      </Card>
    </ScreenShell>
  );
}
