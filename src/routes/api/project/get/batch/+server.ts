import { client } from '$lib/server/graphql-client.server';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';
import { apiErrorResponse } from '$lib/server/api-error.server';
import { checkAdmin } from '$lib/server/ownership.server';
import { validateBody, validationErrorResponse } from '$lib/server/validate.server';
import { projectBatchSchema } from '$lib/server/schemas/project.schema';

export const POST: RequestHandler = async ({ request, locals }) => {
  let body;
  try {
    body = validateBody(projectBatchSchema, await request.json());
  } catch (error) {
    return validationErrorResponse(error);
  }

  const { ids } = body;

  try {
    const query = gql`
      query getProjectsByIds($ids: [ID!]!) {
        projects(where: { id_in: $ids }) {
          id
          name
          description
          projectType
          subType
          projectDetails
          desiredDomain
          domainStatus
          projectStatus
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
            email
          }
          createdAt
        }
      }
    `;

    const response = (await client.request(query, { ids })) as {
      projects: Array<{ owner?: { auth0Id?: string; email?: string } }>;
    };

    // Ownership-Filter: Nur eigene Projekte zurueckgeben (ausser Admin)
    const userIsAdmin = await checkAdmin(locals);
    if (!userIsAdmin && response.projects) {
      response.projects = response.projects.filter(
        (p) => p.owner?.auth0Id === locals.user?.sub || (p.owner?.email && p.owner.email === locals.user?.email)
      );
    }

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
};
