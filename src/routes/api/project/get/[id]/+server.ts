import { client } from '$services/server/graphql-client';
import { gql } from 'graphql-request';

export const GET = async (req) => {
  const id = req.params.id;
  try {
    const query = gql`
      query getProjectById($id: ID!) {
        project(where: { id: $id }, stage: PUBLISHED) {
          id
          name
          description
          projectType
          subType
          projectDetails
          desiredDomain
          domainStatus
          goals
          inspiration
          targetAudience
          budget
          timeline
          features
          customFeature
          primaryColour
          secondaryColour
          accentColour
          desiredFont
          estimatedPrice
          formFields
          pages
          setup
          relatedFiles {
            id
            url
            fileName
          }
          owner {
            id
            familyName
            givenName
          }
          createdAt
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
