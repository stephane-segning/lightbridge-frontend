import React from 'react';

import { Button, Card, Stack, Text } from '@lightbridge/ui';
import { ScreenShell } from './screen-shell';
import type { ApiKey } from '@lightbridge/api-rest';

export function ApiKeysListView({
  items,
  onCreate,
  onEdit,
  onDelete,
}: {
  items: ApiKey[];
  onCreate: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <ScreenShell title="API Keys">
      <Stack direction="row" align="center" justify="between">
        <Text intent="body">Manage keys used by your services.</Text>
        <Button size="sm" onPress={onCreate}>
          New key
        </Button>
      </Stack>
      <Stack gap="sm">
        {items.map((item) => (
          <Card key={item.id} size="sm">
            <Stack gap="sm">
              <Text intent="bodyStrong">{item.name}</Text>
              <Text intent="key">{item.key}</Text>
              <Stack direction="row" gap="sm">
                <Button size="sm" variant="ghost" onPress={() => onEdit(item.id)}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" onPress={() => onDelete(item.id, item.name)}>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </ScreenShell>
  );
}
