import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import type { ProjectResponse } from '$interfaces/project.interface';
import { validateBody, validationErrorResponse, ValidationError } from '$lib/server/validate.server';
import { projectCreateSchema } from '$lib/server/schemas/project.schema';
import { mapFeaturesToHygraph } from '$lib/server/feature-mapping';
import { nameByRace } from 'fantasy-name-generator';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const projectData = validateBody(projectCreateSchema, await request.json()) as any;

    const mutation = gql`
      mutation CreateProject(
        $name: String
        $description: String
        $projectCategory: String
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
        $serviceLevel: Int
        $engineeringApproach: Int
        $specialRequirements: String
        $projectGoal: String
        $timelinePreference: String
        $specificDeadline: Date
        $budgetRange: String
        $pwaApproach: String
        $pwaExistingUrl: String
        $cmsComplexity: Int
        $cmsContentStructure: String
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
            projectCategory: $projectCategory
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
            serviceLevel: $serviceLevel
            engineeringApproach: $engineeringApproach
            specialRequirements: $specialRequirements
            projectGoal: $projectGoal
            timelinePreference: $timelinePreference
            specificDeadline: $specificDeadline
            budgetRange: $budgetRange
            pwaApproach: $pwaApproach
            pwaExistingUrl: $pwaExistingUrl
            cmsComplexity: $cmsComplexity
            cmsContentStructure: $cmsContentStructure
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
      name: projectData.name || '[BASIC]-' + nameByRace('dragon', { gender: 'male' }),
      description: projectData.description || null,
      projectCategory: projectData.projectCategory || null,
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
      features: projectData.features?.length ? mapFeaturesToHygraph(projectData.features) : null,
      customFeature: projectData.customFeature || null,
      primaryColour: projectData.primaryColour || null,
      secondaryColour: projectData.secondaryColour || null,
      accentColour: projectData.accentColour || null,
      desiredFont: projectData.desiredFont || null,
      estimatedPrice: projectData.estimatedPrice || null,
      serviceLevel: projectData.serviceLevel ?? null,
      engineeringApproach: projectData.engineeringApproach ?? null,
      specialRequirements: projectData.specialRequirements || null,
      projectGoal: projectData.projectGoal || null,
      timelinePreference: projectData.timelinePreference || null,
      specificDeadline: projectData.specificDeadline || null,
      budgetRange: projectData.budgetRange || null,
      pwaApproach: projectData.pwaApproach || null,
      pwaExistingUrl: projectData.pwaExistingUrl || null,
      cmsComplexity: projectData.cmsComplexity ?? null,
      cmsContentStructure: projectData.cmsContentStructure || null,
      formFields: JSON.stringify(projectData.formFields || []),
      pages: JSON.stringify(projectData.pages || []),
      setup: projectData.setup ? JSON.stringify(projectData.setup) : null,
      fileIDs: projectData.relatedFiles?.length ? projectData.relatedFiles : null,
      projectStatus: 'created'
    };

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
    if (error instanceof ValidationError) {
      return validationErrorResponse(error);
    }

    console.error('Error creating project:', error);

    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('authorization') || error.message.includes('Unauthorized')) {
        statusCode = 401;
        errorMessage = 'Authorization failed';
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
