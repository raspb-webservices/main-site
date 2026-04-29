import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const apiKey = env.BREVO_API_KEY;
	const listId = env.BREVO_LIST_ID;

	if (!apiKey) {
		return json({ error: 'service_unavailable' }, { status: 503 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'invalid_request' }, { status: 400 });
	}

	const email = typeof body === 'object' && body !== null && 'email' in body
		? String((body as Record<string, unknown>).email)
		: '';

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: 'invalid_email' }, { status: 422 });
	}

	const payload: Record<string, unknown> = { email, updateEnabled: false };
	if (listId) {
		payload.listIds = [parseInt(listId, 10)];
	}

	const res = await fetch('https://api.brevo.com/v3/contacts', {
		method: 'POST',
		headers: {
			'api-key': apiKey,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (res.status === 201) {
		return json({ success: true }, { status: 200 });
	}
	if (res.status === 204) {
		return json({ error: 'already_subscribed' }, { status: 409 });
	}

	return json({ error: 'service_unavailable' }, { status: 503 });
};
