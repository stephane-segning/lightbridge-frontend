import React from 'react';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { Button, Div, Lottie, Page, Stack, Text } from '@lightbridge/ui';

const fingerprintSource = require('@lightbridge/ui/src/assets/lotties/auth/fingerprint-success.json');

const helpIconButtonStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#111827',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 0,
  paddingVertical: 0,
};

const fingerprintContainerStyle = {
  width: 96,
  height: 96,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e8efff',
};

const ssoButtonStyle = {
  width: '100%',
  backgroundColor: '#2563eb',
  borderRadius: 16,
  shadowColor: '#1d4ed8',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 12,
  elevation: 4,
};

const helpTextStyle = {
  color: '#2563eb',
};

const footnoteStyle = {
  color: '#9ca3af',
};

export function LoginView({
  onSsoPress,
  onHelpPress,
  loading,
}: {
  onSsoPress: () => void;
  onHelpPress: () => void;
  loading?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Page tone="muted" style={{ padding: 0 }}>
      <Div
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 448,
          alignSelf: 'center',
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 24,
          position: 'relative',
        }}
      >
        <Stack flex="grow" justify="between" width="full">
          <Button
            variant="primary"
            size="sm"
            onPress={onHelpPress}
            accessibilityLabel={t('login.help')}
            style={helpIconButtonStyle}
            textProps={{ style: { color: '#ffffff' } }}
          >
            <Ionicons name="help" size={18} color="#ffffff" />
          </Button>

          <Stack align="center" width="full">
            <Text intent="bodyStrong" align="center">
              {t('login.title')}
            </Text>
          </Stack>

          <Stack align="center" gap="lg" width="full">
            <Div rounded="xl" pad="lg" style={fingerprintContainerStyle}>
              <Lottie source={fingerprintSource} size="md" loop={false} />
            </Div>

            <Stack align="center" gap="sm" width="full">
              <Text intent="title" align="center">
                {t('login.welcome')}
              </Text>
              <Text intent="body" align="center">
                {t('login.description')}
              </Text>
            </Stack>

            <Button
              variant="primary"
              size="lg"
              disabled={loading}
              onPress={onSsoPress}
              style={ssoButtonStyle}
              textProps={{ style: { color: '#ffffff' } }}
            >
              <Ionicons name="lock-closed" size={18} color="#ffffff" />
              {loading ? t('login.ssoLoading') : t('login.sso')}
            </Button>

            <Text intent="caption" align="center" style={footnoteStyle}>
              {t('login.footnote')}
            </Text>
          </Stack>

          <Stack align="center" width="full">
            <Text
              intent="bodyStrong"
              align="center"
              style={helpTextStyle}
              onPress={onHelpPress}
              accessibilityRole="link"
            >
              {t('login.trouble')}
            </Text>
          </Stack>
        </Stack>
      </Div>
    </Page>
  );
}
