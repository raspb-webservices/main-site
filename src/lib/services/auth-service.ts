import { createAuth0Client, type Auth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, userroles, idToken } from '$store/sharedStates.svelte';
import { authFetch } from '$lib/helper/auth-fetch';
import authConfig from '../configs/auth-config';

async function createClient() {
	return await createAuth0Client({
		domain: authConfig.domain,
		clientId: authConfig.clientId
	});
}

/** Token aus Auth0 SDK holen und im globalen State speichern */
async function storeIdToken(client: Auth0Client) {
	const claims = await client.getIdTokenClaims();
	if (claims?.__raw) {
		idToken.value = claims.__raw;
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

async function loginWithPopup(client: Auth0Client, options?: Record<string, unknown>, popup?: Window) {
	try {
		await client.loginWithPopup(options as Parameters<Auth0Client['loginWithPopup']>[0], { popup });
		const currentUser = await client.getUser();
		if (!currentUser?.sub) return;

		// Token speichern fuer authentifizierte API-Calls
		await storeIdToken(client);

		const currentUserRole = await getRoles();

		// Wenn keine Rolle vorhanden → Kunden-Rolle zuweisen (Erstanmeldung)
		if (currentUserRole.length === 0) {
			await assignRole();
			currentUserRole.push('customer');
		}

		userroles.value = currentUserRole;
		user.value = currentUser;
		isAuthenticated.value = true;
	} catch (e) {
		console.error(e);
	}
}

function logout(client: Auth0Client) {
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
		const isAuth = await client.isAuthenticated();
		if (isAuth) {
			const currentUser = await client.getUser();
			if (currentUser) user.value = currentUser;
			isAuthenticated.value = true;

			// Token speichern fuer authentifizierte API-Calls
			await storeIdToken(client);

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
	getRoles,
	loginWithPopup,
	logout,
	checkAuthState,
	assignRole,
	updateMetadata,
	createAuth0User
};

export default auth;
