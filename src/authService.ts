import { createAuth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen, userroles } from '$store/sharedStates.svelte';
import authConfig from './auth_config';
import API from './lib/helper/auth0Api';

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
      userRoleObjects.forEach((element: any) => {
        userRoles.push(element.name);
      });
    }
    return userRoles;
  }
  throw new Error('Could not fetch user roles from /api/userRoles/user[sub]!');
}

async function loginWithPopup(client: any, options?: any) {
  popupOpen.set(true);

  try {
    await client.loginWithPopup(options);
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

function logout(client: any) {
  isAuthenticated.set(false);
  user.set({ email: '' });
  return client.logout({
    clientId: authConfig.clientId,
    logoutParams: {
      returnTo: authConfig.callbackUrl
    }
  });
}

async function getIdTokenClaims(client: any) {
  return await client.getIdTokenClaims();
}

async function checkAuthState(client: any) {
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

async function createAuth0User(userData: { email: string; password: string; givenName: string; familyName: string; user_metadata: Object }): Promise<any> {
  try {
    const response = await API.post('users', {
      email: userData.email,
      password: userData.password,
      given_name: userData.givenName,
      family_name: userData.familyName,
      connection: 'Username-Password-Authentication',
      verify_email: true,
      user_metadata: userData.user_metadata
    });
    return response;
  } catch (error) {
    console.error('Error creating Auth0 user:', error);
    throw error;
  }
}

async function assignRole(userId: string, rolesToAssign: string[]): Promise<any> {
  try {
    const response = await API.post('users/' + userId + '/roles', {
      roles: rolesToAssign
    });
    return response;
  } catch (error) {
    console.error('Error creating Auth0 user:', error);
    throw error;
  }
}

async function updateMetadata(userId: string, metadata: Object): Promise<any> {
  if (userId) {
    try {
      const response = await API.patch('users/' + userId, {
        user_metadata: metadata
      });
      return response;
    } catch (error) {
      console.error('Error creating Auth0 user:', error);
      throw error;
    }
  } else {
    return 'error - no id';
  }
}

async function getAuth0UserByEmail(email: string): Promise<any> {
  try {
    const response = await API.get(`users-by-email?email=${encodeURIComponent(email)}`, {});
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
  updateMetadata,
  loginWithApi
};

export default auth;

async function loginWithApi(email: string, password: string): Promise<any> {
  try {
    const data = await AuthAPI.login(email, password);

    // Assuming successful login, you might want to store tokens and user info
    // For now, let's just set isAuthenticated and user
    // Use the access_token to get user info
    const userInfoResponse = await fetch(`https://${authConfig.domain}/userinfo`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`
      }
    });

    if (!userInfoResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const currentUser = await userInfoResponse.json();
    const currentUserRole = await getRoles(currentUser.sub);

    userroles.set(currentUserRole);
    user.set(currentUser);
    isAuthenticated.set(true);

    return data;
  } catch (error) {
    console.error('Error during API login:', error);
    throw error;
  }
}
