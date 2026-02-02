import React from 'react';

import { Page, Stack, Text } from '@lightbridge/ui';

export function ScreenShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Page>
      <Text intent="eyebrow">Self-Service</Text>
      <Text intent="title">{title}</Text>
      <Stack gap="md" top="lg">
        {children}
      </Stack>
    </Page>
  );
}
