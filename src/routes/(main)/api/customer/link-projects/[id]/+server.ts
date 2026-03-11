import type { RequestHandler } from '@sveltejs/kit';
import { linkProjectsToCustomer } from '$lib/server/customer-helpers.server';
import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import { checkAdmin, forbiddenResponse } from '$lib/server/ownership.server';
import { validateBody, validationErrorResponse } from '$lib/server/validate.server';
import { customerLinkProjectsByIdSchema } from '$lib/server/schemas/customer.schema';

export const PATCH: RequestHandler = async ({ request, locals }) => {
  let customerData;
  try {
    customerData = validateBody(customerLinkProjectsByIdSchema, await request.json());
  } catch (error) {
    return validationErrorResponse(error);
  }

  // Ownership-Check
  const query = gql`
    query getCustomerAuth0Id($id: ID!) {
      customer(where: { id: $id }, stage: PUBLISHED) {
        auth0Id
      }
    }
  `;
  const result = (await client.request(query, { id: customerData.id })) as {
    customer: { auth0Id?: string } | null;
  };

  const isOwner = result.customer?.auth0Id === locals.user?.sub;
  const userIsAdmin = await checkAdmin(locals);
  if (!isOwner && !userIsAdmin) {
    return forbiddenResponse();
  }

  return linkProjectsToCustomer({ id: customerData.id }, customerData.projectIds ?? null);
};
