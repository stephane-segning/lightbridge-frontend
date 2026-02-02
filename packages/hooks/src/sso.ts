import { useMutation } from '@tanstack/react-query';

import { startSsoLogin } from '@lightbridge/api-rest';
import { openExternalUrl } from '@lightbridge/api-native';

export function useSsoLogin() {
  return useMutation({
    mutationFn: async () => {
      const { url } = await startSsoLogin();
      await openExternalUrl(url);
    },
  });
}
