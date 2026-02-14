import { createRemoteJWKSet, jwtVerify } from 'jose';
import { PUBLIC_VITE_AUTH0_DOMAIN, PUBLIC_VITE_AUTH0_CLIENT_ID } from '$env/static/public';

const JWKS = createRemoteJWKSet(new URL(`https://${PUBLIC_VITE_AUTH0_DOMAIN}/.well-known/jwks.json`));

export async function validateIdToken(token: string): Promise<{ sub: string; email: string; name?: string }> {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: `https://${PUBLIC_VITE_AUTH0_DOMAIN}/`,
    audience: PUBLIC_VITE_AUTH0_CLIENT_ID
  });

  const sub = payload.sub;
  const email = payload.email as string | undefined;

  if (!sub || !email) {
    throw new Error('Token missing required claims (sub, email)');
  }

  return {
    sub,
    email,
    name: (payload.name as string) || undefined
  };
}
