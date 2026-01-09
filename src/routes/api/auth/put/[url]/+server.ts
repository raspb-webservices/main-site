import API from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ params, request }) => {
  const urlPart = params.url;
  try {
    const requestData = await request.json();
    const response = await API.put(urlPart, requestData);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
