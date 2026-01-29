import { createAuth0Client, type Auth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen, userroles } from '$store/sharedStates.svelte';
import authConfig from '../configs/auth-config';

async function createClient() {
  return await createAuth0Client({
    domain: authConfig.domain,
    clientId: authConfig.clientId
  });
}

async function getRoles(userid: string): Promise<string[]> {
  const userRolesResponse = await fetch('/api/user/role/get/' + userid);
  if (userRolesResponse.ok) {
    const userRoleObjects = await userRolesResponse.json();

    const userRoles = [];
    if (userRoleObjects && userRoleObjects.length) {
      userRoleObjects.forEach((element: unknown) => {
        userRoles.push(element['name']);
      });
    }
    return userRoles;
  }
  throw new Error('Could not fetch user roles from /api/userRoles/user[sub]!');
}

async function loginWithPopup(client: Auth0Client, options?: unknown, popup?: Window) {
  popupOpen.set(true);

  try {
    await client.loginWithPopup(options, { popup });
    const currentUser = await client.getUser();
    const currentUserRole = await getRoles(currentUser.sub);

    userroles.set(currentUserRole);
    user.set(currentUser);
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client: Auth0Client) {
  isAuthenticated.set(false);
  user.set({ email: '' });
  return client.logout({
    clientId: authConfig.clientId,
    logoutParams: {
      returnTo: authConfig.callbackUrl
    }
  });
}

async function getIdTokenClaims(client: Auth0Client) {
  return await client.getIdTokenClaims();
}

async function checkAuthState(client: Auth0Client) {
  try {
    const isAuth = await client.isAuthenticated();
    if (isAuth) {
      const currentUser = await client.getUser();
      user.set(currentUser);
      isAuthenticated.set(true);
    } else {
      isAuthenticated.set(false);
    }
  } catch (e) {
    console.error('Error checking auth state:', e);
    isAuthenticated.set(false);
  }
}

async function createAuth0User(userData: { email: string; password: string; givenName: string; familyName: string; user_metadata: object }): Promise<unknown> {
  try {
    const fetchString = '/api/auth/post/' + 'users';
    const requestData = {
      email: userData.email,
      password: userData.password,
      given_name: userData.givenName,
      family_name: userData.familyName,
      connection: 'Username-Password-Authentication',
      verify_email: true,
      user_metadata: userData.user_metadata
    };

    const response = await fetch(fetchString, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    return response;
  } catch (error) {
    console.error('Error creating Auth0 user:', error);
    throw error;
  }
}

async function assignRole(userId: string, rolesToAssign: string[]): Promise<unknown> {
  try {
    const fetchString = '/api/auth/post/userRole/' + userId;
    const requestData = {
      roles: rolesToAssign
    };
    const response = await fetch(fetchString, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    return response;
  } catch (error) {
    console.error('Error assigning role:', error);
    throw error;
  }
}

async function updateMetadata(userId: string, metadata: object): Promise<unknown> {
  if (userId) {
    try {
      const fetchString = '/api/auth/patch/users/' + userId;
      const requestData = {
        user_metadata: metadata
      };
      const response = await fetch(fetchString, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      return response;
    } catch (error) {
      console.error('Error updating metadata:', error);
      throw error;
    }
  } else {
    return 'error - no id';
  }
}

async function getAuth0UserByEmail(email: string): Promise<unknown> {
  try {
    const fetchString = '/api/auth/get/' + `users-by-email?email=${encodeURIComponent(email)}`;
    const response = await fetch(fetchString);
    return response;
  } catch (error) {
    console.error('Error fetching Auth0 user by email:', error);
    throw error;
  }
}

const auth = {
  assignRole,
  createClient,
  getRoles,
  loginWithPopup,
  logout,
  getIdTokenClaims,
  checkAuthState,
  createAuth0User,
  getAuth0UserByEmail,
  updateMetadata
};

export default auth;
