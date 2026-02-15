import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { validateIdToken } from '$lib/server/auth.server';
import { getAuthLevel } from '$lib/server/route-auth.server';
import { isAdmin } from '$lib/server/auth0-helper.server';
import { checkRateLimit } from '$lib/server/rate-limit.server';

/** Public POST-Routes die rate-limited werden */
const RATE_LIMITED_ROUTES = ['/api/mail/send', '/api/project/create', '/api/customer/create', '/api/user-question/create'];

const handleAuth: Handle = async ({ event, resolve }) => {
  event.locals.user = null;

  // Nur API-Routes pruefen
  if (!event.url.pathname.startsWith('/api/')) {
    return resolve(event);
  }

  const authLevel = getAuthLevel(event.request.method, event.url.pathname);

  // Rate-Limiting fuer oeffentliche POST-Endpoints
  if (authLevel === 'public' && event.request.method === 'POST') {
    const pathname = event.url.pathname;
    if (RATE_LIMITED_ROUTES.some((route) => pathname.startsWith(route))) {
      const ip = event.getClientAddress();
      const limited = checkRateLimit(ip, pathname);
      if (limited) return limited;
    }
  }

  // Token aus Authorization-Header lesen
  const authHeader = event.request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (token) {
    try {
      event.locals.user = await validateIdToken(token);
    } catch {
      if (authLevel !== 'public') {
        return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }

  // Public Routes brauchen keine Auth (aber nutzen locals.user wenn vorhanden)
  if (authLevel === 'public') {
    return resolve(event);
  }

  if (!event.locals.user) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Admin-Check fuer Admin-only Routes
  if (authLevel === 'admin') {
    const userIsAdmin = await isAdmin(event.locals.user.sub);
    if (!userIsAdmin) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return resolve(event);
};

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%lang%', locale)
    });
  });

export const handle: Handle = sequence(handleAuth, handleParaglide);
