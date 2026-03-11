import { updateUserMetadata } from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';
import { apiErrorResponse } from '$lib/server/api-error.server';
import { validateBody, validationErrorResponse } from '$lib/server/validate.server';
import { updateMetadataSchema } from '$lib/server/schemas/auth.schema';

export const PATCH: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = validateBody(updateMetadataSchema, await request.json());
  } catch (error) {
    return validationErrorResponse(error);
  }

  try {
    const result = await updateUserMetadata(locals.user.sub, body.user_metadata);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
};
