import type { RequestHandler } from '@sveltejs/kit';
import type { User } from '$interfaces/user.interface';
import { updateCustomer } from '$lib/server/customer-helpers.server';

export const PATCH: RequestHandler = async ({ request }) => {
	const customerData: User = await request.json();

	if (!customerData.email) {
		return new Response(JSON.stringify({ success: false, error: 'Customer Email is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return updateCustomer({ email: customerData.email }, customerData);
};
