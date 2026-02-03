import { stageEnv } from '@app/configs/config.management';

export const keycloakConfig = {
  issuer: stageEnv(process.env.EXPO_PUBLIC_KEYCLOAK_ISSUER, '${EXPO_PUBLIC_KEYCLOAK_ISSUER}'),
  clientId: stageEnv(process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID, '${EXPO_PUBLIC_KEYCLOAK_CLIENT_ID}'),
  scheme: stageEnv(process.env.EXPO_PUBLIC_KEYCLOAK_SCHEME, '${EXPO_PUBLIC_KEYCLOAK_SCHEME}'),
};
