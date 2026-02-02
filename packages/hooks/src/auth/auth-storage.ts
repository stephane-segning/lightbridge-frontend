import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import type { AuthSession } from './auth-types';

const STORAGE_KEY = 'lightbridge.auth.session';

export async function loadStoredSession(): Promise<AuthSession | null> {
  try {
    if (Platform.OS === 'web') {
      if (typeof localStorage === 'undefined') {
        return null;
      }
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthSession) : null;
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
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, payload);
    }
    return;
  }

  await SecureStore.setItemAsync(STORAGE_KEY, payload);
}

export async function clearStoredSession() {
  if (Platform.OS === 'web') {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    return;
  }

  await SecureStore.deleteItemAsync(STORAGE_KEY);
}
