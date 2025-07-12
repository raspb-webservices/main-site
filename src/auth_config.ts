interface AuthConfig {
  domain: string;
  clientId: string;
  callbackUrl?: string,
}

const authConfig: AuthConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  callbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL || ''
};

// Validierung hinzufügen
if (!authConfig.domain || !authConfig.clientId) {
  console.error('Auth0 Konfiguration fehlt! Bitte Environment Variables setzen.');
}

export default authConfig;