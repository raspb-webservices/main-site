import type { RequestHandler } from '@sveltejs/kit';
import { updateCustomer } from '$lib/server/customer-helpers.server';
import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import { checkAdmin, forbiddenResponse } from '$lib/server/ownership.server';
import { validateBody, validationErrorResponse } from '$lib/server/validate.server';
import { customerPatchByIdSchema } from '$lib/server/schemas/customer.schema';

export const PATCH: RequestHandler = async ({ request, locals }) => {
  let customerData;
  try {
    customerData = validateBody(customerPatchByIdSchema, await request.json());
  } catch (error) {
    return validationErrorResponse(error);
  }

  // Ownership-Check: Customer laden und auth0Id pruefen
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

  return updateCustomer({ id: customerData.id }, customerData);
};
