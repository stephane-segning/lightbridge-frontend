import { Platform } from 'react-native';

export const isDev = process.env.NODE_ENV !== 'production';

export const stageEnv = (localEnvParam: string, dynamicEnvParam: string) => {
  if (isDev) {
    return localEnvParam;
  }

  if (Platform.OS !== 'web') {
    return localEnvParam;
  }

  return dynamicEnvParam;
};
