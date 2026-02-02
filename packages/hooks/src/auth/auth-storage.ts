import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { del, get, set } from 'idb-keyval';

import type { AuthSession } from './auth-types';

const STORAGE_KEY = 'lightbridge.auth.session';

export async function loadStoredSession(): Promise<AuthSession | null> {
  try {
    if (Platform.OS === 'web') {
      const raw = await get(STORAGE_KEY);
      if (typeof raw === 'string') {
        return raw ? (JSON.parse(raw) as AuthSession) : null;
      }
      if (raw) {
        return raw as AuthSession;
      }
      return null;
    }

    const raw = await SecureStore.getItemAsync(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export async function saveStoredSession(session: AuthSession) {
  const payload = JSON.stringify(session);

  if (Platform.OS === 'web') {
    await set(STORAGE_KEY, payload);
    return;
  }

  await SecureStore.setItemAsync(STORAGE_KEY, payload);
}

export async function clearStoredSession() {
  if (Platform.OS === 'web') {
    await del(STORAGE_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(STORAGE_KEY);
}
