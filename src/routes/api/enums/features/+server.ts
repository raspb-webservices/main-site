import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';

export const GET = async () => {
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
    const { __type } = await client.request(query) as any;
    return new Response(JSON.stringify(__type.enumValues));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
