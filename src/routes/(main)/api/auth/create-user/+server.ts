import { createUser } from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';
import { apiErrorResponse } from '$lib/server/api-error.server';
import { validateBody, validationErrorResponse } from '$lib/server/validate.server';
import { createUserSchema } from '$lib/server/schemas/auth.schema';

export const POST: RequestHandler = async ({ request }) => {
  let body;
  try {
    body = validateBody(createUserSchema, await request.json());
  } catch (error) {
    return validationErrorResponse(error);
  }

  try {
    const auth0User = await createUser({
      email: body.email,
      password: body.password,
      given_name: body.givenName,
      family_name: body.familyName,
      user_metadata: body.user_metadata,
      connection: 'Username-Password-Authentication'
    });

    return new Response(JSON.stringify(auth0User), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
};
