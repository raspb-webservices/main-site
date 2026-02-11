import type { RequestHandler } from '@sveltejs/kit';
import type { User } from '$interfaces/user.interface';
import { linkProjectsToCustomer } from '$lib/server/customer-helpers.server';

export const PATCH: RequestHandler = async ({ request }) => {
	const customerData: User = await request.json();

	if (!customerData.id) {
		return new Response(JSON.stringify({ success: false, error: 'Customer ID is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return linkProjectsToCustomer({ id: customerData.id }, customerData.projectIds ?? null);
};
