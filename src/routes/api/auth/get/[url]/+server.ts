import API from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';
import { apiErrorResponse } from '$lib/server/api-error.server';

export const GET: RequestHandler = async (req) => {
  const urlPart = req.params.url!;
  try {
    const response = await API.get(urlPart, {});
    return new Response(JSON.stringify(response));
  } catch (error) {
    return apiErrorResponse(error);
  }
};
