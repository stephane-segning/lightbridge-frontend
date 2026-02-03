import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { del, get, set } from 'idb-keyval';

import type { AuthSession } from './auth-types';

const STORAGE_KEY = 'lightbridge.auth.session';

function parseStoredSession(raw: unknown): AuthSession | null {
  if (!raw) {
    console.log('[auth-storage] empty value');
    return null;
  }

  if (typeof raw === 'string') {
    try {
      console.log('[auth-storage] parsing string');
      const parsed = JSON.parse(raw) as unknown;
      return parseStoredSession(parsed);
    } catch {
      console.log('[auth-storage] failed to parse string');
      return null;
    }
  }

  if (typeof raw === 'object') {
    console.log('[auth-storage] parsed object');
    return raw as AuthSession;
  }

  console.log('[auth-storage] unsupported type', typeof raw);
  return null;
}

export async function loadStoredSession(): Promise<AuthSession | null> {
  try {
    if (Platform.OS === 'web') {
      const raw = await get(STORAGE_KEY);
      console.log('[auth-storage] web raw', typeof raw);
      return parseStoredSession(raw);
    }

    const raw = await SecureStore.getItemAsync(STORAGE_KEY);
    console.log('[auth-storage] native raw', typeof raw);
    return parseStoredSession(raw);
  } catch {
    console.log('[auth-storage] load failed');
    return null;
  }
}

export async function saveStoredSession(session: AuthSession) {
  if (Platform.OS === 'web') {
    await set(STORAGE_KEY, session);
    return;
  }

  const payload = JSON.stringify(session);
  await SecureStore.setItemAsync(STORAGE_KEY, payload);
}

export async function clearStoredSession() {
  if (Platform.OS === 'web') {
    await del(STORAGE_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(STORAGE_KEY);
}
