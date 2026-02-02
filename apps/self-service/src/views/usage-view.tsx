import React from 'react';

import { Card, Stack, Text } from '@lightbridge/ui';
import { ScreenShell } from './screen-shell';
import type { TokenUsage } from '@lightbridge/api-rest';

export function UsageView({ usage }: { usage: TokenUsage[] }) {
  return (
    <ScreenShell title="Token Usage">
      <Stack gap="sm">
        {usage.map((item) => (
          <Card key={item.date} size="sm">
            <Stack gap="sm">
              <Text intent="key">{item.date}</Text>
              <Text intent="value">{item.tokens.toLocaleString()} tokens</Text>
              <Text intent="caption">{item.requests} requests</Text>
            </Stack>
          </Card>
        ))}
      </Stack>
    </ScreenShell>
  );
}
