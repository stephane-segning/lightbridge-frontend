export type ApiKey = {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsedAt?: string | null;
};

export type TokenUsage = {
  date: string;
  tokens: number;
  requests: number;
};

export type CreateApiKeyInput = {
  name: string;
};

export type UpdateApiKeyInput = {
  name: string;
};

let apiKeys: ApiKey[] = [
  {
    id: 'key_001',
    name: 'Production',
    key: 'lb_live_8bdc4b4c2e',
    createdAt: '2026-01-05T09:12:00Z',
    lastUsedAt: '2026-02-01T18:45:00Z',
  },
  {
    id: 'key_002',
    name: 'Staging',
    key: 'lb_test_9af0b7d9f1',
    createdAt: '2026-01-21T12:22:00Z',
    lastUsedAt: null,
  },
];

const usage: TokenUsage[] = [
  { date: '2026-01-28', tokens: 12840, requests: 420 },
  { date: '2026-01-29', tokens: 14210, requests: 452 },
  { date: '2026-01-30', tokens: 11980, requests: 388 },
  { date: '2026-01-31', tokens: 16750, requests: 503 },
  { date: '2026-02-01', tokens: 15120, requests: 476 },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateKey() {
  const seed = Math.random().toString(36).slice(2, 10);
  return `lb_live_${seed}`;
}

export async function listApiKeys(): Promise<ApiKey[]> {
  await delay(120);
  return [...apiKeys];
}

export async function getApiKey(id: string): Promise<ApiKey | null> {
  await delay(120);
  return apiKeys.find((item) => item.id === id) ?? null;
}

export async function createApiKey(input: CreateApiKeyInput): Promise<ApiKey> {
  await delay(200);
  const next: ApiKey = {
    id: `key_${Date.now()}`,
    name: input.name,
    key: generateKey(),
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
  };
  apiKeys = [next, ...apiKeys];
  return next;
}

export async function updateApiKey(id: string, input: UpdateApiKeyInput): Promise<ApiKey> {
  await delay(200);
  let updated: ApiKey | undefined;
  apiKeys = apiKeys.map((item) => {
    if (item.id === id) {
      updated = { ...item, name: input.name };
      return updated;
    }
    return item;
  });
  if (!updated) {
    throw new Error('ApiKey not found');
  }
  return updated;
}

export async function deleteApiKey(id: string): Promise<void> {
  await delay(150);
  apiKeys = apiKeys.filter((item) => item.id !== id);
}

export async function getTokenUsage(): Promise<TokenUsage[]> {
  await delay(150);
  return [...usage];
}

export async function startSsoLogin(): Promise<{ url: string }>
{
  await delay(100);
  return { url: 'https://sso.example.com/login' };
}
