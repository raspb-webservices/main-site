import { client } from '$lib/server/graphql-client';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';

export const GET: RequestHandler = async () => {
  try {
    const query = gql`
      query getFeaturese {
        __type(name: "Features") {
          enumValues {
            name
          }
        }
      }
    `;
    const { __type } = (await client.request(query)) as any;
    return new Response(JSON.stringify(__type.enumValues));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
