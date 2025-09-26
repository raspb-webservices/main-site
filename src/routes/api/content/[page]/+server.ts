import { client } from '$lib/services/graphql-client';
import { gql } from 'graphql-request';

export const GET = async (req) => {
  const page = req.params.page;
  try {
    const query = gql`
      query getContentsByPage($page: String!) {
        contents(where: { page: $page }, stage: PUBLISHED) {
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

    const variables = { page };
    const response = await client.request(query, variables);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
