/**
 * Simple in-memory rate limiter for serverless environments.
 *
 * Limitations on Netlify/Lambda:
 * - State lives only within a single warm function instance
 * - Parallel instances each have their own counter
 * - For production-grade limiting, replace with Upstash Redis (@upstash/ratelimit)
 *
 * Still useful: catches rapid-fire abuse on warm instances (bot spam, script loops).
 */

interface RateLimitEntry {
	count: number;
	resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
	const now = Date.now();
	if (now - lastCleanup < CLEANUP_INTERVAL) return;
	lastCleanup = now;
	for (const [key, entry] of store) {
		if (now > entry.resetAt) {
			store.delete(key);
		}
	}
}

export interface RateLimitConfig {
	/** Max requests per window */
	maxRequests: number;
	/** Window size in milliseconds */
	windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
	maxRequests: 10,
	windowMs: 60_000
};

/**
 * Check if a request should be rate-limited.
 * Returns null if allowed, or a Response (429) if blocked.
 */
export function checkRateLimit(
	ip: string,
	route: string,
	config: RateLimitConfig = DEFAULT_CONFIG
): Response | null {
	cleanup();

	const key = `${ip}:${route}`;
	const now = Date.now();
	const entry = store.get(key);

	if (!entry || now > entry.resetAt) {
		store.set(key, { count: 1, resetAt: now + config.windowMs });
		return null;
	}

	entry.count++;

	if (entry.count > config.maxRequests) {
		const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
		return new Response(
			JSON.stringify({ error: 'Too many requests' }),
			{
				status: 429,
				headers: {
					'Content-Type': 'application/json',
					'Retry-After': String(retryAfter)
				}
			}
		);
	}

	return null;
}
