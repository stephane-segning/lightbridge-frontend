import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page, Stack, Text } from '@lightbridge/ui';

export function AppSplashView() {
  const { t } = useTranslation();

  return (
    <Page tone="muted" pad="lg">
      <Stack align="center" justify="center" flex="grow" width="full">
        <Stack align="center" gap="lg" width="full">
          <Stack align="center" gap="xs" width="full">
            <Text intent="title" align="center">
              {t('app.brand')}
            </Text>
            <Text intent="body" align="center">
              {t('app.splash.loading')}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
}
