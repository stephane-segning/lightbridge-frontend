import React from 'react';

import { Button, Card, Stack, Text, TextField } from '@lightbridge/ui';
import { ScreenShell } from './screen-shell';

export function ApiKeyFormView({
  name,
  onNameChange,
  onSubmit,
  loading,
}: {
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}) {
  return (
    <ScreenShell title="Create or Update">
      <Card>
        <Stack gap="sm">
          <Text intent="body">Key name</Text>
          <TextField value={name} onChangeText={onNameChange} placeholder="Production" />
          <Button onPress={onSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save key'}
          </Button>
        </Stack>
      </Card>
    </ScreenShell>
  );
}
