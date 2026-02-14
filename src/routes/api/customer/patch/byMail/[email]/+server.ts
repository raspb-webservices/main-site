import type { RequestHandler } from '@sveltejs/kit';
import { updateCustomer } from '$lib/server/customer-helpers.server';
import { checkAdmin, forbiddenResponse } from '$lib/server/ownership.server';
import { validateBody, validationErrorResponse } from '$lib/server/validate.server';
import { customerPatchByMailSchema } from '$lib/server/schemas/customer.schema';

export const PATCH: RequestHandler = async ({ request, locals }) => {
  let customerData;
  try {
    customerData = validateBody(customerPatchByMailSchema, await request.json());
  } catch (error) {
    return validationErrorResponse(error);
  }

  // Ownership-Check: Email muss zum eingeloggten User passen
  const isOwner = locals.user?.email === customerData.email;
  const userIsAdmin = await checkAdmin(locals);
  if (!isOwner && !userIsAdmin) {
    return forbiddenResponse();
  }

  return updateCustomer({ email: customerData.email }, customerData);
};
