import { PUBLIC_AUTH0_DOMAIN, PUBLIC_AUTH0_CLIENT_ID  } from '$env/static/public';
interface AuthConfig {
  domain: string;
  clientId: string;
}

const authConfig: AuthConfig = {
  domain: PUBLIC_AUTH0_DOMAIN,
  clientId: PUBLIC_AUTH0_CLIENT_ID
};

// Validierung hinzufügen
if (!authConfig.domain || !authConfig.clientId) {
  console.error('Auth0 Konfiguration fehlt! Bitte Environment Variables setzen.');
}

export default authConfig;