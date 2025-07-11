import { env } from '$env/dynamic/public';
interface AuthConfig {
  domain: string;
  clientId: string;
}

const authConfig: AuthConfig = {
  domain: env.PUBLIC_AUTH0_DOMAIN || '',
  clientId: env.PUBLIC_AUTH0_CLIENT_ID || ''
};

// Validierung hinzufügen
if (!authConfig.domain || !authConfig.clientId) {
  console.error('Auth0 Konfiguration fehlt! Bitte Environment Variables setzen.');
}

export default authConfig;