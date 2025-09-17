interface AuthConfig {
  domain: string;
  clientId: string;
  callbackUrl?: string;
  audience?: string;
}

const authConfig: AuthConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  callbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL || '',
  audience: import.meta.env.VITE_AUTH0_AUDIENCE || ''
};

// Validierung hinzufügen
if (!authConfig.domain || !authConfig.clientId) {
  console.log("ENV ", import.meta.env)
  console.error('Auth0 Konfiguration fehlt! Bitte Environment Variables setzen.');
}

export default authConfig;
