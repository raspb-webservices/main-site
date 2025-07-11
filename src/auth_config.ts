interface AuthConfig {
  domain: string;
  clientId: string;
}

const authConfig: AuthConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || ''
};

// Validierung hinzufügen
if (!authConfig.domain || !authConfig.clientId) {
  console.error('Auth0 Konfiguration fehlt! Bitte Environment Variables setzen.');
}

export default authConfig;