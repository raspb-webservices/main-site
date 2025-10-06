import API from '$lib/server/auth0-helper';
import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params, request }) => {
  const urlPart = params.url;
  try {
    const response = await API.delete(urlPart, request);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};





