import { client } from '$lib/server/graphql-client';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';

export const GET: RequestHandler = async () => {
  try {
    const query = gql`
      query getProjects {
        projects(stage: PUBLISHED) {
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
            familyName
            givenName
            salutation
            email
            phone
            company
            address
            postCode
            city
            country
          }
          createdAt
        }
      }
    `;
    const response = await client.request(query);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
