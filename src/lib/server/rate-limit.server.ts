import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN
});

// 10 Requests per 60 seconds per IP — shared across all Lambda instances
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true
});

/**
 * Check if a request should be rate-limited.
 * Returns null if allowed, or a Response (429) if blocked.
 */
export async function checkRateLimit(ip: string, pathname: string): Promise<Response | null> {
  const identifier = `${ip}:${pathname}`;
  const { success, reset } = await ratelimit.limit(identifier);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter)
      }
    });
  }

  return null;
}
