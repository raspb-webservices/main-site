import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

export const GET = async (req) => {
  const page = req.params.page;
  try {
    const query = gql`
      query getSnippets($page: String!) {
        contentSnippets(where: { pageToPlace: $page }, stage: PUBLISHED) {
          createdAt
          name
          headline
          subheadline
          content
          contentSecondParagraph
          contentThirdParagraph
          contentFourthParagraph
          contentFifthParagraph
          specialContent
          specialContentOpt
          pageToPlace
          position
          active
          images {
            url
            fileName
          }
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
