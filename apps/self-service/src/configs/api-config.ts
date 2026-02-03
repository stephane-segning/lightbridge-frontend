import { stageEnv } from '@app/configs/config.management';

export const apiConfig = {
  backendUrl: stageEnv(process.env.EXPO_PUBLIC_BACKEND_URL, '${EXPO_PUBLIC_BACKEND_URL}'),
};
