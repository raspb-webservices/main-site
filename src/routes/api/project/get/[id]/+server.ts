import { client } from '$lib/server/graphql-client.server';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';
import { apiErrorResponse } from '$lib/server/api-error.server';
import { checkAdmin, forbiddenResponse } from '$lib/server/ownership.server';

export const GET: RequestHandler = async ({ params, locals }) => {
  const id = params.id;
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
            auth0Id
            familyName
            givenName
          }
          createdAt
        }
      }
    `;

    const variables = { id };
    const response = (await client.request(query, variables)) as {
      project: { owner?: { auth0Id?: string } } | null;
    };

    // Ownership-Check: Owner's auth0Id muss zum eingeloggten User passen
    if (response.project?.owner) {
      const isOwner = response.project.owner.auth0Id === locals.user?.sub;
      const userIsAdmin = await checkAdmin(locals);
      if (!isOwner && !userIsAdmin) {
        return forbiddenResponse();
      }
    }

    return new Response(JSON.stringify(response));
  } catch (error) {
    return apiErrorResponse(error);
  }
};
