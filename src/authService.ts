import { createAuth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$store/sharedStates.svelte';
import authConfig from './auth_config';

async function createClient() {
  return await createAuth0Client({
    domain: authConfig.domain,
    clientId: authConfig.clientId
  });
}

async function loginWithPopup(client: any, options?: any) {
  console.log("loginWithPopup called")
  popupOpen.set(true);

  console.log(" popupOpen ",  popupOpen.get())

  try {
    const login = await client.loginWithPopup(options);

    console.log(" login ",  login)

    const currentUser = await client.getUser();

    console.log(" currentUser ",  currentUser)

    user.set(currentUser);
    isAuthenticated.set(true); // Verwende .set() Methode
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client: any) {
  isAuthenticated.set(false); // Verwende .set() Methode
  user.set({ name: '', nickname: '', user_id: '', email: '' }); // Setze User zurück
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
      isAuthenticated.set(true); // Verwende .set() Methode
    } else {
      isAuthenticated.set(false); // Verwende .set() Methode
    }
  } catch (e) {
    console.error('Error checking auth state:', e);
    isAuthenticated.set(false); // Verwende .set() Methode
  }
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
  getIdTokenClaims,
  checkAuthState
};

export default auth;