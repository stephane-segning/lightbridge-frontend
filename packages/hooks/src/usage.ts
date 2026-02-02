import { useQuery } from '@tanstack/react-query';

import { getTokenUsage } from '@lightbridge/api-rest';

export function useTokenUsage() {
  return useQuery({
    queryKey: ['token-usage'],
    queryFn: getTokenUsage,
  });
}
