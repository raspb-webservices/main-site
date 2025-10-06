import { client } from '$lib/server/graphql-client';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';

export const GET: RequestHandler = async (req) => {
  const id = req.params.id;
  try {
    const query = gql`
      mutation publishAsset($id: ID!) {
        publishAsset(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `;
    const variables = { id };
    const response = await client.request(query, variables);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
