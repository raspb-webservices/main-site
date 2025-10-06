import { client } from '$lib/server/graphql-client';
import { gql } from 'graphql-request';

export const GET = async () => {
  try {
    const query = gql`
      query getContents {
        contents(stage: PUBLISHED) {
          headline
          subheadline
          text
          images {
            url
            fileName
          }
          page
          section
        }
      }
    `;
    const response = await client.request(query);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
