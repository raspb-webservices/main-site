export type AuthLevel = 'public' | 'auth' | 'admin';

/**
 * Routes die ohne Authentifizierung zugaenglich sind.
 * Prefix-Match: '/api/content' matcht auch '/api/content/homepage'.
 */
const PUBLIC_PREFIXES = [
  '/api/content',
  '/api/enums/',
  '/api/user-question/',
  '/api/mail/',
  '/api/project/create',
  '/api/project/publish/',
  '/api/project/link-customer/',
  '/api/customer/create',
  '/api/customer/publish/',
  '/api/asset/'
];

/**
 * Routes die nur fuer Admins zugaenglich sind.
 * Format: "METHOD:exact-path" - matcht nur exakt (nicht Sub-Pfade).
 */
const ADMIN_ROUTES = ['GET:/api/customer/get', 'GET:/api/project/get'];

export function getAuthLevel(method: string, pathname: string): AuthLevel {
  // Public routes - Prefix-Match
  for (const prefix of PUBLIC_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      return 'public';
    }
  }

  // Admin routes - exakter Match (kein Sub-Pfad)
  const routeKey = `${method.toUpperCase()}:${pathname}`;
  for (const adminRoute of ADMIN_ROUTES) {
    if (routeKey === adminRoute) {
      return 'admin';
    }
  }

  // Default: Authentifizierung erforderlich
  return 'auth';
}
