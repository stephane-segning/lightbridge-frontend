import { createCollection, localOnlyCollectionOptions } from '@tanstack/react-db';

import type { AuthSession } from './auth-types';

const initialSession: AuthSession = {
  id: 'current',
  user: null,
  tokens: null,
};

export const authSessionCollection = createCollection(
  localOnlyCollectionOptions({
    id: 'auth-session',
    getKey: (item: AuthSession) => item.id,
    initialData: [initialSession],
  })
);

export function setAuthSession(next: AuthSession) {
  console.log('[auth-store] set session', {
    hasAccess: Boolean(next.tokens?.accessToken),
    hasId: Boolean(next.tokens?.idToken),
    hasRefresh: Boolean(next.tokens?.refreshToken),
    hasUser: Boolean(next.user),
  });
  authSessionCollection.update('current', (draft) => {
    Object.assign(draft, next);
  });
}

export function clearAuthSession() {
  console.log('[auth-store] clear session');
  authSessionCollection.update('current', (draft) => {
    draft.user = null;
    draft.tokens = null;
  });
}
