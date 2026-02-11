import API from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';
import { apiErrorResponse } from '$lib/server/api-error.server';

export const POST: RequestHandler = async ({ params, request }) => {
  const urlPart = params.url;
  try {
    const requestData = await request.json();
    const response = await API.post('users/' + urlPart + '/roles', requestData);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return apiErrorResponse(error);
  }
};
