import { client } from '$lib/server/graphql-client.server';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';
import { apiErrorResponse } from '$lib/server/api-error.server';

export const GET: RequestHandler = async (req) => {
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
    return apiErrorResponse(error);
  }
};
