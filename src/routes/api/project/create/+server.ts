import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from './$types';
import type { Project, ProjectResponse, projectStatus } from '$interfaces/project.interface';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const projectData: Project = await request.json();

    const mutation = gql`
      mutation CreateProject(
        $name: String
        $description: String
        $projectType: ProjectType
        $subType: SubType
        $projectDetails: String
        $desiredDomain: String
        $domainStatus: String
        $goals: String
        $inspiration: String
        $targetAudience: String
        $budget: String
        $timeline: String
        $features: [Features!]
        $customFeature: String
        $primaryColour: String
        $secondaryColour: String
        $accentColour: String
        $desiredFont: String
        $estimatedPrice: Float
        $formFields: Json!
        $pages: Json!
        $setup: Json
        $fileIDs: [AssetWhereUniqueInput!]
        $projectStatus: ProjectStatus
      ) {
        createProject(
          data: {
            name: $name
            description: $description
            projectType: $projectType
            subType: $subType
            projectDetails: $projectDetails
            desiredDomain: $desiredDomain
            domainStatus: $domainStatus
            goals: $goals
            inspiration: $inspiration
            targetAudience: $targetAudience
            budget: $budget
            timeline: $timeline
            features: $features
            customFeature: $customFeature
            primaryColour: $primaryColour
            secondaryColour: $secondaryColour
            accentColour: $accentColour
            desiredFont: $desiredFont
            estimatedPrice: $estimatedPrice
            formFields: $formFields
            pages: $pages
            setup: $setup
            relatedFiles: { connect: $fileIDs }
            projectStatus: $projectStatus
          }
        ) {
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
            fileName
          }
          owner {
            familyName
            givenName
          }
          createdAt
          projectStatus
        }
      }
    `;

    // Variablen für die Mutation vorbereiten
    const variables = {
      name: projectData.name || 'untitled',
      description: projectData.description || null,
      projectType: projectData.projectType || null,
      subType: projectData.subType || null,
      projectDetails: projectData.projectDetails || null,
      desiredDomain: projectData.desiredDomain || null,
      domainStatus: projectData.domainStatus || null,
      goals: projectData.goals || null,
      inspiration: projectData.inspiration || null,
      targetAudience: projectData.targetAudience || null,
      budget: projectData.budget || null,
      timeline: projectData.timeline || null,
      features: projectData.features?.length ? projectData.features : null,
      customFeature: projectData.customFeature || null,
      primaryColour: projectData.primaryColour || null,
      secondaryColour: projectData.secondaryColour || null,
      accentColour: projectData.accentColour || null,
      desiredFont: projectData.desiredFont || null,
      estimatedPrice: projectData.estimatedPrice || null,
      formFields: projectData.formFields ? JSON.stringify(projectData.formFields) : null,
      pages: projectData.pages ? JSON.stringify(projectData.pages) : null,
      setup: projectData.setup ? JSON.stringify(projectData.setup) : null,
      fileIDs: projectData.relatedFiles?.length ? projectData.relatedFiles : null,
      projectStatus: "created"
    };

    console.log('PROJECT VARIABLES ', variables);

    // GraphQL Request an Hygraph senden
    const response = (await client.request(mutation, variables)) as { createProject: ProjectResponse };

    return new Response(
      JSON.stringify({
        success: true,
        data: response.createProject
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error creating project:', error);

    // Spezifische Fehlerbehandlung für GraphQL-Fehler
    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;

      // Prüfe auf spezifische GraphQL-Fehler
      if (error.message.includes('authorization') || error.message.includes('Unauthorized')) {
        statusCode = 401;
        errorMessage = 'Authorization failed';
      } else if (error.message.includes('validation') || error.message.includes('required')) {
        statusCode = 400;
        errorMessage = 'Validation error: ' + error.message;
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
