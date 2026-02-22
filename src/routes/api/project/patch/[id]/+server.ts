import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import type { ProjectResponse } from '$interfaces/project.interface';
import { checkAdmin, forbiddenResponse } from '$lib/server/ownership.server';
import { validateBody, validationErrorResponse, ValidationError } from '$lib/server/validate.server';
import { projectPatchSchema } from '$lib/server/schemas/project.schema';

export const PATCH: RequestHandler = async ({ request, locals }) => {
  try {
    const rawBody = await request.json();
    const projectData = validateBody(projectPatchSchema, rawBody);
    const projectId = projectData.id;

    // Ownership-Check: Projekt-Owner pruefen
    const ownerQuery = gql`
      query getProjectOwner($id: ID!) {
        project(where: { id: $id }, stage: PUBLISHED) {
          owner {
            auth0Id
          }
        }
      }
    `;
    const ownerResult = (await client.request(ownerQuery, { id: projectId })) as {
      project: { owner?: { auth0Id?: string } } | null;
    };
    const isOwner = ownerResult.project?.owner?.auth0Id === locals.user?.sub;
    const userIsAdmin = await checkAdmin(locals);
    if (!isOwner && !userIsAdmin) {
      return forbiddenResponse();
    }

    // Dynamisch nur die vorhandenen Felder für die Mutation vorbereiten
    const updateFields: string[] = [];
    const variables: Record<string, any> = { id: projectId };

    // Alle möglichen Felder prüfen und nur die vorhandenen hinzufügen
    // null == undefined → true; damit werden sowohl undefined als auch null übersprungen
    if (projectData.name != null) {
      updateFields.push('name: $name');
      variables.name = projectData.name;
    }
    if (projectData.description != null) {
      updateFields.push('description: $description');
      variables.description = projectData.description;
    }
    if (projectData.projectCategory != null) {
      updateFields.push('projectCategory: $projectCategory');
      variables.projectCategory = projectData.projectCategory;
    }
    if (projectData.projectType != null) {
      updateFields.push('projectType: $projectType');
      variables.projectType = projectData.projectType;
    }
    if (projectData.subType != null) {
      updateFields.push('subType: $subType');
      variables.subType = projectData.subType;
    }
    if (projectData.projectDetails != null) {
      updateFields.push('projectDetails: $projectDetails');
      variables.projectDetails = projectData.projectDetails;
    }
    if (projectData.desiredDomain != null) {
      updateFields.push('desiredDomain: $desiredDomain');
      variables.desiredDomain = projectData.desiredDomain;
    }
    if (projectData.domainStatus != null) {
      updateFields.push('domainStatus: $domainStatus');
      variables.domainStatus = projectData.domainStatus;
    }
    if (projectData.goals != null) {
      updateFields.push('goals: $goals');
      variables.goals = projectData.goals;
    }
    if (projectData.inspiration != null) {
      updateFields.push('inspiration: $inspiration');
      variables.inspiration = projectData.inspiration;
    }
    if (projectData.targetAudience != null) {
      updateFields.push('targetAudience: $targetAudience');
      variables.targetAudience = projectData.targetAudience;
    }
    if (projectData.budget != null) {
      updateFields.push('budget: $budget');
      variables.budget = projectData.budget;
    }
    if (projectData.timeline != null) {
      updateFields.push('timeline: $timeline');
      variables.timeline = projectData.timeline;
    }
    if (projectData.features != null) {
      updateFields.push('features: $features');
      variables.features = projectData.features?.length ? projectData.features : null;
    }
    if (projectData.customFeature != null) {
      updateFields.push('customFeature: $customFeature');
      variables.customFeature = projectData.customFeature;
    }
    if (projectData.primaryColour != null) {
      updateFields.push('primaryColour: $primaryColour');
      variables.primaryColour = projectData.primaryColour;
    }
    if (projectData.secondaryColour != null) {
      updateFields.push('secondaryColour: $secondaryColour');
      variables.secondaryColour = projectData.secondaryColour;
    }
    if (projectData.accentColour != null) {
      updateFields.push('accentColour: $accentColour');
      variables.accentColour = projectData.accentColour;
    }
    if (projectData.desiredFont != null) {
      updateFields.push('desiredFont: $desiredFont');
      variables.desiredFont = projectData.desiredFont;
    }
    if (projectData.estimatedPrice != null) {
      updateFields.push('estimatedPrice: $estimatedPrice');
      variables.estimatedPrice = projectData.estimatedPrice;
    }
    if (projectData.formFields != null) {
      updateFields.push('formFields: $formFields');
      variables.formFields = projectData.formFields.length ? JSON.stringify(projectData.formFields) : null;
    }
    if (projectData.pages != null) {
      updateFields.push('pages: $pages');
      variables.pages = projectData.pages.length ? JSON.stringify(projectData.pages) : null;
    }
    if (projectData.relatedFiles != null) {
      updateFields.push('relatedFiles: { set: $fileIDs }');
      variables.fileIDs = projectData.relatedFiles?.length ? projectData.relatedFiles : [];
    }
    if (projectData.setup != null) {
      updateFields.push('setup: $setup');
      variables.setup = JSON.stringify(projectData.setup);
    }
    if (projectData.projectStatus != null) {
      updateFields.push('projectStatus: $projectStatus');
      variables.projectStatus = projectData.projectStatus;
    }
    if (projectData.serviceLevel != null) {
      updateFields.push('serviceLevel: $serviceLevel');
      variables.serviceLevel = projectData.serviceLevel;
    }
    if (projectData.engineeringApproach != null) {
      updateFields.push('engineeringApproach: $engineeringApproach');
      variables.engineeringApproach = projectData.engineeringApproach;
    }
    if (projectData.specialRequirements != null) {
      updateFields.push('specialRequirements: $specialRequirements');
      variables.specialRequirements = projectData.specialRequirements;
    }
    if (projectData.timelinePreference != null) {
      updateFields.push('timelinePreference: $timelinePreference');
      variables.timelinePreference = projectData.timelinePreference;
    }
    // specificDeadline must be a valid ISO date string or omitted – empty string is invalid
    if (projectData.specificDeadline != null && projectData.specificDeadline !== '') {
      updateFields.push('specificDeadline: $specificDeadline');
      variables.specificDeadline = projectData.specificDeadline;
    }
    if (projectData.budgetRange != null) {
      updateFields.push('budgetRange: $budgetRange');
      variables.budgetRange = projectData.budgetRange;
    }
    if (projectData.pwaApproach != null) {
      updateFields.push('pwaApproach: $pwaApproach');
      variables.pwaApproach = projectData.pwaApproach;
    }
    if (projectData.pwaExistingUrl != null) {
      updateFields.push('pwaExistingUrl: $pwaExistingUrl');
      variables.pwaExistingUrl = projectData.pwaExistingUrl;
    }
    if (projectData.cmsComplexity != null) {
      updateFields.push('cmsComplexity: $cmsComplexity');
      variables.cmsComplexity = projectData.cmsComplexity;
    }
    if (projectData.cmsContentStructure != null) {
      updateFields.push('cmsContentStructure: $cmsContentStructure');
      variables.cmsContentStructure = projectData.cmsContentStructure;
    }
    if (projectData.estimatedExpertDays != null) {
      updateFields.push('estimatedExpertDays: $estimatedExpertDays');
      variables.estimatedExpertDays = projectData.estimatedExpertDays;
    }

    // Prüfen, ob mindestens ein Feld zum Update vorhanden ist
    if (updateFields.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No fields to update provided'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Dynamische GraphQL-Mutation basierend auf den vorhandenen Feldern erstellen
    const variableDefinitions = Object.keys(variables)
      .filter((key) => key !== 'id')
      .map((key) => {
        switch (key) {
          case 'projectType':
            return '$projectType: ProjectType';
          case 'subType':
            return '$subType: SubType';
          case 'features':
            return '$features: [Features!]';
          case 'estimatedPrice':
            return '$estimatedPrice: Float';
          case 'serviceLevel':
            return '$serviceLevel: Int';
          case 'engineeringApproach':
            return '$engineeringApproach: Int';
          case 'cmsComplexity':
            return '$cmsComplexity: Int';
          case 'estimatedExpertDays':
            return '$estimatedExpertDays: Int';
          case 'projectStatus':
            return '$projectStatus: ProjectStatus';
          case 'specificDeadline':
            return '$specificDeadline: Date';
          case 'formFields':
            return '$formFields: Json';
          case 'pages':
            return '$pages: Json';
          case 'setup':
            return '$setup: Json';
          case 'fileIDs':
            return '$fileIDs: [AssetWhereUniqueInput!]';
          default:
            return `$${key}: String`;
        }
      })
      .join('\n        ');

    const mutation = gql`
      mutation UpdateProject(
        $id: ID!
        ${variableDefinitions}
      ) {
        updateProject(
          where: { id: $id }
          data: {
            ${updateFields.join('\n            ')}
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
          projectStatus
          serviceLevel
          engineeringApproach
          specialRequirements
          timelinePreference
          specificDeadline
          budgetRange
          pwaApproach
          pwaExistingUrl
          cmsComplexity
          cmsContentStructure
          formFields
          pages
          setup
          relatedFiles {
            id
            fileName
            url
          }
          owner {
            familyName
            givenName
          }
          createdAt
          updatedAt
        }
      }
    `;

    const response = (await client.request(mutation, variables)) as { updateProject: ProjectResponse };

    // Auto-publish: 3s warten, dann direkt server-seitig publizieren
    // (verhindert Client-seitige Race-Condition wenn Drawer geschlossen wird)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const publishMutation = gql`
        mutation PublishProject($id: ID!) {
          publishProject(where: { id: $id }, to: PUBLISHED) {
            id
            stage
          }
        }
      `;
      await client.request(publishMutation, { id: projectId });
    } catch (publishError) {
      console.warn('Auto-publish failed:', publishError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: response.updateProject
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return validationErrorResponse(error);
    }

    const gqlError = error as Record<string, unknown>;

    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.message.includes('authorization') || error.message.includes('Unauthorized')) {
        statusCode = 401;
        errorMessage = 'Authorization failed';
      } else if (error.message.includes('not found') || error.message.includes('does not exist')) {
        statusCode = 404;
        errorMessage = 'Project not found';
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        details: gqlError?.response
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
