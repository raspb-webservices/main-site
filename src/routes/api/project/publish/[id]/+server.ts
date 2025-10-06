import { client } from '$lib/server/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (req) => {
  const id = req.params.id;
  try {
    const query = gql`
      mutation publishProject($id: ID!) {
        publishProject(where: { id: $id }, to: PUBLISHED) {
          id
          stage
        }
      }
    `;

    const variables = { id };
    const response = (await client.request(query, variables)) as any;
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}