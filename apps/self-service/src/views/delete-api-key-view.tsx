import React from 'react';

import { Button, Card, Page, Stack, Text } from '@lightbridge/ui';

export function DeleteApiKeyView({
  name,
  onConfirm,
  onCancel,
  loading,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  return (
    <Page>
      <Card>
        <Stack gap="sm">
          <Text intent="value">Delete API key</Text>
          <Text intent="body">
            You are about to delete "{name}". This action cannot be undone.
          </Text>
          <Stack direction="row" gap="sm">
            <Button variant="ghost" onPress={onCancel}>
              Cancel
            </Button>
            <Button onPress={onConfirm} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Page>
  );
}
