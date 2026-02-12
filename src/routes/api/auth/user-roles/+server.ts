import { getUserRoles } from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';
import { apiErrorResponse } from '$lib/server/api-error.server';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return new Response(JSON.stringify({ error: 'Authentication required' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const roles = await getUserRoles(locals.user.sub);
		return new Response(JSON.stringify(roles), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return apiErrorResponse(error);
	}
};
