import { client } from '$services/server/graphql-client';
import { gql } from 'graphql-request';

export const GET = async () => {
  try {
    const query = gql`
      query getProjectType {
        __type(name: "ProjectType") {
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
