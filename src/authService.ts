import { createAuth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$store/sharedStates.svelte';
import config from './auth_config';

async function createClient() {
  return await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId
  });
}

async function loginWithPopup(client, options) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);
    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client) {
  return client.logout({
    clientId: config.clientId,
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
