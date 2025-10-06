import { client } from '$lib/server/graphql-client';
import { gql } from 'graphql-request';

export const GET = async () => {
  try {
    const query = gql`
      query getProjectStatus {
        __type(name: "ProjectStatus") {
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
