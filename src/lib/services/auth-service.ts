import { createAuth0Client, type Auth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, userroles, idToken } from '$store/sharedStates.svelte';
import { authFetch } from '$lib/helper/auth-fetch';
import authConfig from '../configs/auth-config';
import { goto } from '$app/navigation';

let auth0Client: Auth0Client | null = null;

async function getClient() {
  if (!auth0Client) {
    auth0Client = await createAuth0Client({
      domain: authConfig.domain,
      clientId: authConfig.clientId,
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      authorizationParams: {
        audience: authConfig.audience,
        scope: 'openid profile email'
      }
    });
  }
  return auth0Client;
}

/** Legacy support, alias for getClient but creates new if needed? No, let's use singleton */
async function createClient() {
  return getClient();
}

/** Token aus Auth0 SDK holen und im globalen State speichern */
async function storeIdToken(client: Auth0Client) {
  try {
    const claims = await client.getIdTokenClaims();
    if (claims?.__raw) {
      idToken.value = claims.__raw;
    } else {
      console.warn('storeIdToken: No ID token claims found');
    }
  } catch (e) {
    console.error('storeIdToken: Error getting ID token claims:', e);
  }
}

async function loadUserProfile() {
  try {
    const response = await authFetch('/api/auth/user-profile');
    if (response.ok) {
      const profile = await response.json();
      if (profile.user_metadata) {
        // Merge user_metadata into the user object (overwriting standard claims if needed)
        user.value = { ...user.value, ...profile.user_metadata };
      }
    }
  } catch (e) {
    console.error('Error loading user profile:', e);
  }
}

async function getRoles(): Promise<string[]> {
  const response = await authFetch('/api/auth/user-roles');
  if (response.ok) {
    const roleObjects = await response.json();
    if (roleObjects && roleObjects.length) {
      return roleObjects.map((r: Record<string, string>) => r.name);
    }
    return [];
  }
  throw new Error('Could not fetch user roles');
}

async function loginWithPopup(client: Auth0Client, options?: Record<string, unknown>, popup?: Window): Promise<{ isFirstLogin: boolean }> {
  try {
    await client.loginWithPopup(options as Parameters<Auth0Client['loginWithPopup']>[0], { popup });
    const currentUser = await client.getUser();
    if (!currentUser?.sub) return { isFirstLogin: false };

    // User im Store setzen (Basis-Daten)
    user.value = currentUser;
    isAuthenticated.value = true;

    // Token speichern fuer authentifizierte API-Calls
    await storeIdToken(client);

    // Profil-Metadaten laden (merged in user.value)
    await loadUserProfile();

    const currentUserRole = await getRoles();
    let isFirstLogin = false;

    // Wenn keine Rolle vorhanden → Kunden-Rolle zuweisen (Erstanmeldung)
    if (currentUserRole.length === 0) {
      await assignRole();
      currentUserRole.push('customer');
      isFirstLogin = true;
    }

    userroles.value = currentUserRole;

    return { isFirstLogin };
  } catch (e) {
    console.error(e);
    return { isFirstLogin: false };
  }
}

async function logout(client: Auth0Client) {
  await goto('/');
  isAuthenticated.value = false;
  user.value = { email: '' };
  userroles.value = [];
  idToken.value = null;
  return client.logout({
    clientId: authConfig.clientId,
    logoutParams: {
      returnTo: authConfig.callbackUrl
    }
  });
}

async function checkAuthState(client: Auth0Client) {
  try {
    // Versuche stillschweigend ein Token zu bekommen (prüft Session/Refresh Token)
    try {
      await client.getTokenSilently();
    } catch (e) {
      // Wenn das fehlschlägt, sind wir nicht eingeloggt
      // Fehler wird nicht geloggt, da dies der erwartete Zustand bei nicht eingeloggten Nutzern ist
      isAuthenticated.value = false;
      return;
    }

    const isAuth = await client.isAuthenticated();
    if (isAuth) {
      const currentUser = await client.getUser();
      if (currentUser) user.value = currentUser;
      isAuthenticated.value = true;

      // Token speichern fuer authentifizierte API-Calls
      await storeIdToken(client);

      // Profil-Metadaten laden
      await loadUserProfile();

      // Rollen laden
      const roles = await getRoles();
      userroles.value = roles;
    } else {
      isAuthenticated.value = false;
    }
  } catch (e) {
    console.error('Error checking auth state:', e);
    isAuthenticated.value = false;
  }
}

async function checkSession() {
  const client = await getClient();
  await checkAuthState(client);
}

async function assignRole(): Promise<unknown> {
  const response = await authFetch('/api/auth/assign-role', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json();
}

async function updateMetadata(metadata: object): Promise<unknown> {
  const response = await authFetch('/api/auth/update-metadata', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_metadata: metadata })
  });
  return response.json();
}

async function createAuth0User(userData: {
  email: string;
  password: string;
  givenName: string;
  familyName: string;
  user_metadata: {
    familyName: string;
    givenName: string;
  };
}): Promise<unknown> {
  const response = await authFetch('/api/auth/create-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  return response.json();
}

const auth = {
  createClient,
  getClient,
  getRoles,
  loginWithPopup,
  logout,
  checkAuthState,
  checkSession,
  assignRole,
  updateMetadata,
  createAuth0User
};

export default auth;
