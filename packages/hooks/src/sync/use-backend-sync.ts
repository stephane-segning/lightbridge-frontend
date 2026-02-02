import { useCallback, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { listApiKeys, getTokenUsage } from '@lightbridge/api-rest';
import { setTokenUsage } from '../data/usage-store';
import { upsertApiKeys } from '../data/api-keys-store';

type SyncState = {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt?: number;
};

export function useBackendSync() {
  const [state, setState] = useState<SyncState>({
    isOnline: true,
    isSyncing: false,
  });

  const syncNow = useCallback(async () => {
    setState((prev) => ({ ...prev, isSyncing: true }));

    try {
      const [apiKeys, usage] = await Promise.all([listApiKeys(), getTokenUsage()]);
      upsertApiKeys(apiKeys);
      setTokenUsage(usage);
      setState((prev) => ({
        ...prev,
        lastSyncedAt: Date.now(),
      }));
    } finally {
      setState((prev) => ({ ...prev, isSyncing: false }));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((status) => {
      const isOnline = Boolean(status.isConnected && status.isInternetReachable !== false);
      setState((prev) => ({ ...prev, isOnline }));
      if (isOnline) {
        syncNow();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [syncNow]);

  return {
    ...state,
    syncNow,
  };
}
