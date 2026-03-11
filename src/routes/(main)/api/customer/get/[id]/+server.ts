import { client } from '$lib/server/graphql-client.server';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';
import { apiErrorResponse } from '$lib/server/api-error.server';
import { checkAdmin, forbiddenResponse } from '$lib/server/ownership.server';

export const GET: RequestHandler = async ({ params, locals }) => {
  const id = params.id;
  try {
    const query = gql`
      query getCustomerById($id: ID!) {
        customer(where: { id: $id }, stage: PUBLISHED) {
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

    const variables = { id };
    const response = (await client.request(query, variables)) as {
      customer: { auth0Id?: string } | null;
    };

    // Ownership-Check: auth0Id muss zum eingeloggten User passen
    if (response.customer) {
      const isOwner = response.customer.auth0Id === locals.user?.sub;
      const userIsAdmin = await checkAdmin(locals);
      if (!isOwner && !userIsAdmin) {
        return forbiddenResponse();
      }
    }

    return new Response(JSON.stringify(response));
  } catch (error) {
    return apiErrorResponse(error);
  }
};
