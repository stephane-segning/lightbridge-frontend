import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Card, Heading, Stack, Text } from '@lightbridge/ui';
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
  const { t } = useTranslation();

  return (
    <ScreenShell title={t('apiKeys.title')}>
      <Stack direction="row" align="center" justify="between">
        <Heading tone="subtitle">{t('apiKeys.subtitle')}</Heading>
        <Button size="sm" onPress={onCreate}>
          {t('apiKeys.new')}
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
                  {t('apiKeys.edit')}
                </Button>
                <Button size="sm" variant="ghost" onPress={() => onDelete(item.id, item.name)}>
                  {t('apiKeys.delete')}
                </Button>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </ScreenShell>
  );
}
