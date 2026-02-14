import { idToken } from '$store/sharedStates.svelte';

/**
 * Wrapper um fetch(), der automatisch den Auth0 ID-Token
 * als Authorization-Header mitsendet (wenn vorhanden).
 * Fuer geschuetzte API-Routes verwenden.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers);

  if (idToken.value) {
    headers.set('Authorization', `Bearer ${idToken.value}`);
  }

  return fetch(url, { ...options, headers });
}
