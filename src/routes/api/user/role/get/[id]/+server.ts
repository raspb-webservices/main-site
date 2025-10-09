import API from '$lib/server/auth0-helper.server';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (req) => {
  const id = req.params.id;
  try {
    const response = await API.get('users/' + id + '/roles', req);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
