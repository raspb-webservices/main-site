import API from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ params, request }) => {
  const urlPart = params.url;
  try {
    const response = await API.post(urlPart, request);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};





