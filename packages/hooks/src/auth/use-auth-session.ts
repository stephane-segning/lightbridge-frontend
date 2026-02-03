import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from '@tanstack/react-db';

import type { AuthSession } from './auth-types';
import { authSessionCollection, clearAuthSession, setAuthSession } from './auth-store';
import { clearStoredSession, loadStoredSession, saveStoredSession } from './auth-storage';

export function useAuthSession() {
  const { data } = useLiveQuery((q) => q.from({ auth: authSessionCollection }));

  const session = useMemo<AuthSession>(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data[0] as AuthSession;
    }
    return { id: 'current', user: null, tokens: null };
  }, [data]);

  const isAuthenticated = Boolean(
    session.tokens?.accessToken || session.tokens?.idToken || session.tokens?.refreshToken
  );

  console.log('[auth] session snapshot', {
    hasData: Array.isArray(data) ? data.length : 0,
    hasAccess: Boolean(session.tokens?.accessToken),
    hasId: Boolean(session.tokens?.idToken),
    hasRefresh: Boolean(session.tokens?.refreshToken),
    isAuthenticated,
  });

  return { session, isAuthenticated };
}

export function useAuthHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      console.log('[auth] hydrate start');
      try {
        const stored = await loadStoredSession();
        console.log('[auth] hydrate loaded', {
          hasStored: Boolean(stored),
          hasAccess: Boolean(stored?.tokens?.accessToken),
          hasId: Boolean(stored?.tokens?.idToken),
          hasRefresh: Boolean(stored?.tokens?.refreshToken),
        });
        const hasTokens = Boolean(
          stored?.tokens?.accessToken ||
            stored?.tokens?.idToken ||
            stored?.tokens?.refreshToken
        );

        if (stored && hasTokens) {
          setAuthSession(stored);
          console.log('[auth] hydrate applied');
        } else {
          clearAuthSession();
          console.log('[auth] hydrate cleared');
        }
      } finally {
        if (isMounted) {
          setIsHydrated(true);
          console.log('[auth] hydrate complete');
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isHydrated };
}

export async function persistAuthSession(session: AuthSession) {
  await saveStoredSession(session);
}

export async function clearPersistedAuthSession() {
  clearAuthSession();
  await clearStoredSession();
}
