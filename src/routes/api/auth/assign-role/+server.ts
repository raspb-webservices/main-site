import { assignRoleToUser, getUserRoles } from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';
import { apiErrorResponse } from '$lib/server/api-error.server';

/** Hardcoded customer role ID - einzige Rolle die sich User selbst zuweisen duerfen */
const CUSTOMER_ROLE_ID = 'rol_eqqXJZxCRsW8zLRt';

export const POST: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return new Response(JSON.stringify({ error: 'Authentication required' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		// Pruefen ob User bereits eine Rolle hat
		const existingRoles = await getUserRoles(locals.user.sub);
		if (existingRoles.length > 0) {
			return new Response(
				JSON.stringify({ message: 'Role already assigned', roles: existingRoles }),
				{ headers: { 'Content-Type': 'application/json' } }
			);
		}

		await assignRoleToUser(locals.user.sub, [CUSTOMER_ROLE_ID]);

		return new Response(
			JSON.stringify({ success: true, message: 'Customer role assigned' }),
			{ status: 201, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		return apiErrorResponse(error);
	}
};
