import { isAdmin } from '$lib/server/auth0-helper.server';

/**
 * Prueft ob der eingeloggte User Admin ist.
 * Ergebnis wird fuer die Dauer des Requests nicht gecacht -
 * bei Bedarf kann hier ein In-Memory-Cache ergaenzt werden.
 */
export async function checkAdmin(locals: App.Locals): Promise<boolean> {
  if (!locals.user) return false;
  return isAdmin(locals.user.sub);
}

/** Gibt 403-Response zurueck wenn weder Owner noch Admin */
export function forbiddenResponse(): Response {
  return new Response(JSON.stringify({ error: 'Access denied - not owner or admin' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
}
