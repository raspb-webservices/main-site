import { client } from '$lib/server/graphql-client.server';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';
import { apiErrorResponse } from '$lib/server/api-error.server';

export const POST: RequestHandler = async ({ request }) => {
	const { ids } = await request.json();

	if (!Array.isArray(ids) || ids.length === 0) {
		return new Response(JSON.stringify({ projects: [] }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const query = gql`
			query getProjectsByIds($ids: [ID!]!) {
				projects(where: { id_in: $ids }, stage: PUBLISHED) {
					id
					name
					description
					projectType
					subType
					projectDetails
					desiredDomain
					domainStatus
					projectStatus
					goals
					inspiration
					targetAudience
					budget
					timeline
					features
					customFeature
					primaryColour
					secondaryColour
					accentColour
					desiredFont
					estimatedPrice
					formFields
					pages
					setup
					relatedFiles {
						id
						url
						fileName
					}
					owner {
						id
						familyName
						givenName
					}
					createdAt
				}
			}
		`;

		const response = await client.request(query, { ids });
		return new Response(JSON.stringify(response), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return apiErrorResponse(error);
	}
};
