import {
  PUBLIC_VITE_AUTH0_AUDIENCE,
  PUBLIC_VITE_AUTH0_CLIENT_ID,
  PUBLIC_VITE_AUTH0_TOKEN_URL
} from '$env/static/public';
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
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw new Error('Failed to obtain Auth0 management token');
  }
}

const apiRequest = async (method: string, url: string, request: unknown) => {
  const token = await getToken();

  const options: RequestInit = {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  };

  if (request && method !== 'get') {
    options.body = JSON.stringify(request);
  }

  const response = await fetch(`${PUBLIC_VITE_AUTH0_AUDIENCE}${url}`, options);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Auth0 API error ${response.status}: ${errorBody}`);
  }

  return response.json();
};

const get = (url: string, request: unknown) => apiRequest('get', url, request);
const deleteRequest = (url: string, request: unknown) => apiRequest('delete', url, request);
const post = (url: string, request: unknown) => apiRequest('post', url, request);
const put = (url: string, request: unknown) => apiRequest('put', url, request);
const patch = (url: string, request: unknown) => apiRequest('patch', url, request);

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
  return apiRequest('get', `users/${userId}/roles`, null) as Promise<Auth0Role[]>;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const roles = await getUserRoles(userId);
  return roles.some((r) => r.name === 'admin');
}

export async function assignRoleToUser(userId: string, roleIds: string[]): Promise<void> {
  await apiRequest('post', `users/${userId}/roles`, { roles: roleIds });
}

export async function updateUserMetadata(
  userId: string,
  metadata: Record<string, unknown>
): Promise<unknown> {
  return apiRequest('patch', `users/${userId}`, { user_metadata: metadata });
}
