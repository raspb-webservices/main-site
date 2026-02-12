import { client } from '$lib/server/graphql-client.server';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';
import { apiErrorResponse } from '$lib/server/api-error.server';
import { checkAdmin, forbiddenResponse } from '$lib/server/ownership.server';

export const GET: RequestHandler = async ({ params, locals }) => {
	const email = params.email;

	// Ownership-Check: Email muss zum eingeloggten User passen
	const isOwner = locals.user?.email === email;
	const userIsAdmin = await checkAdmin(locals);
	if (!isOwner && !userIsAdmin) {
		return forbiddenResponse();
	}

	try {
		const query = gql`
			query getCustomerById($email: String!) {
				customer(where: { email: $email }) {
					address
					auth0Id
					city
					company
					country
					createdAt
					email
					familyName
					givenName
					id
					phone
					postCode
					projects {
						id
						name
					}
					salutation
				}
			}
		`;

		const variables = { email };
		const response = await client.request(query, variables);
		return new Response(JSON.stringify(response));
	} catch (error) {
		return apiErrorResponse(error);
	}
};
