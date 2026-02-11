import { client } from '$lib/server/graphql-client.server';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';
import { apiErrorResponse } from '$lib/server/api-error.server';

export const GET: RequestHandler = async () => {
  try {
    const query = gql`
      query getFeatures {
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
    return apiErrorResponse(error);
  }
};
