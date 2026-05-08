export function createId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID();
  }

  return `task_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 11)}`;
}
