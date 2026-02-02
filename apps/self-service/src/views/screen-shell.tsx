import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page, Stack, Text } from '@lightbridge/ui';

export function ScreenShell({ title, children }: { title: string; children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <Page>
      <Text intent="eyebrow">{t('app.brand')}</Text>
      <Text intent="title">{title}</Text>
      <Stack gap="md" top="lg">
        {children}
      </Stack>
    </Page>
  );
}
