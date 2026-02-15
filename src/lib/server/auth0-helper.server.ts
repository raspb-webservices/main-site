import { PUBLIC_VITE_AUTH0_AUDIENCE, PUBLIC_VITE_AUTH0_CLIENT_ID, PUBLIC_VITE_AUTH0_TOKEN_URL } from '$env/static/public';
import { env } from '$env/dynamic/private';

async function getToken() {
  try {
    const response = await fetch(PUBLIC_VITE_AUTH0_TOKEN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: PUBLIC_VITE_AUTH0_CLIENT_ID,
        client_secret: env.VITE_AUTH0_CLIENT_SECRET,
        audience: PUBLIC_VITE_AUTH0_AUDIENCE,
        grant_type: 'client_credentials'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching token response:', errorText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
}

const apiRequest = async (method: string, url: string, request: unknown) => {
  const token = await getToken();

  const options: RequestInit = {
    method: method.toUpperCase(),
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  };

  if (request && method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(request);
  }

  // Ensure url doesn't start with / if PUBLIC_VITE_AUTH0_AUDIENCE ends with /
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  const fullUrl = `${PUBLIC_VITE_AUTH0_AUDIENCE}${cleanUrl}`;

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Auth0 API error ${response.status}: ${errorBody}`);
  }

  // Some endpoints return 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const get = (url: string, request: unknown) => apiRequest('GET', url, request);
const deleteRequest = (url: string, request: unknown) => apiRequest('DELETE', url, request);
const post = (url: string, request: unknown) => apiRequest('POST', url, request);
const put = (url: string, request: unknown) => apiRequest('PUT', url, request);
const patch = (url: string, request: unknown) => apiRequest('PATCH', url, request);

const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch
};

export default API;

// --- Typed helpers for specific Auth0 Management API operations ---

interface Auth0Role {
  id: string;
  name: string;
  description?: string;
}

export async function getUserRoles(userId: string): Promise<Auth0Role[]> {
  return apiRequest('GET', `users/${userId}/roles`, null) as Promise<Auth0Role[]>;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const roles = await getUserRoles(userId);
  return roles.some((r) => r.name === 'admin');
}

export async function assignRoleToUser(userId: string, roleIds: string[]): Promise<void> {
  await apiRequest('POST', `users/${userId}/roles`, { roles: roleIds });
}

export async function getUserProfile(userId: string): Promise<Record<string, unknown>> {
  return apiRequest('GET', `users/${userId}`, null) as Promise<Record<string, unknown>>;
}

export async function updateUserMetadata(userId: string, metadata: Record<string, unknown>): Promise<unknown> {
  return apiRequest('PATCH', `users/${userId}`, { user_metadata: metadata });
}

export async function createUser(userData: {
  email: string;
  password?: string;
  given_name?: string;
  family_name?: string;
  user_metadata?: Record<string, unknown>;
  connection?: string;
}): Promise<unknown> {
  const payload = {
    ...userData,
    connection: userData.connection || 'Username-Password-Authentication'
  };
  return apiRequest('POST', 'users', payload);
}
