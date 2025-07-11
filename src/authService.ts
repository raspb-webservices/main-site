import { createAuth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$store/sharedStates.svelte';
import authConfig from './auth_config';

async function createClient() {
  return await createAuth0Client({
    domain: authConfig.domain,
    clientId: authConfig.clientId
  });
}

async function loginWithPopup(client, options?) {
  console.log("loginWithPopup called")
  popupOpen.set(true);

  console.log(" popupOpen ",  popupOpen.get())

  try {
    const login = await client.loginWithPopup(options);

    console.log(" login ",  login)

    const currentUser = await client.getUser();

    console.log(" currentUser ",  currentUser)

    user.set(currentUser);
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client) {
  return client.logout({
    clientId: authConfig.clientId,
    logoutParams: {
      returnTo: 'http://localhost:5173/'
    }
  });
}

async function getIdTokenClaims(client) {
  return await client.getIdTokenClaims();
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
  getIdTokenClaims
};

export default auth;
